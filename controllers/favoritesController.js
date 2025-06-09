import User from "../models/userModel.js";
import FavoriteMovie from "../models/favoriteMovieModel.js"
import tmdb from "../utils/tmdb.js";

const addFavorite = async (req, res) => {
    try { 
        const { movieId } = req.body
        const user = await User.findById(req.user._id)

        if (!user) {
            return res.status(400).json({ error: "User Not Found" })
        }
         
        const exists = await FavoriteMovie.findOne({ userId: req.user._id, movieId });

        if (exists) {
            return res.status(400).json({ message: "Already favorited" })
        };

        const response = await tmdb.get(`/movie/${movieId}`);
        const favorite = new FavoriteMovie({
            userId: req.user._id,
            movieId,
            movieData: response.data
          });
      
          await favorite.save();

        res.status(200).json({
            message: "Favorites Updated",
            favorite
        })

    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}


const getfavoriteMovies = async (req, res) => {
    try {
        const favorites = await FavoriteMovie.find({ userId: req.user._id });
  res.status(200).json(favorites.map(fav => fav.movieData));
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const removefavorite = async (req, res) => {
    try {
      const { movieId } = req.params;
  
      const result = await FavoriteMovie.findOneAndDelete({ userId: req.user._id, movieId });
  
      if (!result) return res.status(404).json({ message: "Movie not found in favorites" });
  
      res.status(200).json({ message: "Removed from Favorites" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

export {addFavorite,getfavoriteMovies,removefavorite}