import Review from "../models/reviewModel.js";
import tmdb from "../utils/tmdb.js";


const addReview = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { movieId, reviewText, rating } = req.body;
    if (!movieId || !reviewText) {
      return res.status(400).json({ message: 'Movie ID and review text are required' });
    }
      
    const review = new Review({
      userId,
      movieId,
      reviewText,
      rating
    });

      await review.save();
      
      res.status(201).json({message : "Successful", review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getMovieReviews = async (req, res) => {
  try {
    const userId = req.user.id; 
    const reviews = await Review.find({ userId }); 

    const enrichedReviews = await Promise.all(
      reviews.map(async (review) => {
    try {
      const { data } = await tmdb.get(`/movie/${review.movieId}`)
      
      return {
        ...review.toObject(),
        title : data.title
      }
    } catch (error) {
      return {
            ...review.toObject(),
            title: 'Unknown Title',
          };
    }
  })
)
    res.status(200).json({
      message: "Successful",
      reviews: enrichedReviews
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch user reviews' });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { movieId } = req.params;

    const review = await Review.findOneAndDelete({
      movieId,
      userId: req.user._id 
    });

    if (!review) return res.status(404).json({ message: "Review not found" });

    res.status(200).json({ message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export {addReview,getMovieReviews,deleteReview}
