import Watchlist from "../models/watchlistModel.js";
import tmdb from "../utils/tmdb.js";

const addToWatchlist = async (req, res) => {
  try {
    const { movieId } = req.body;

    const exists = await Watchlist.findOne({ userId: req.user._id, movieId });
    if (exists) return res.status(400).json({ message: "Movie already in watchlist" });

    const response = await tmdb.get(`/movie/${movieId}`);

    
    const watchItem = new Watchlist({
      userId: req.user._id,
      movieId,
      movieData: response.data
    });

    await watchItem.save();

    res.status(201).json({message:"Added To watchlist",watchItem});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getWatchlist = async (req, res) => {
    try {
      const list = await Watchlist.find({ userId: req.user._id });
      res.status(200).json(list.map(item => item.movieData));
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};
   
const removeFromWatchlist = async (req, res) => {
    try {
      const { movieId } = req.params;
  
      const result = await Watchlist.findOneAndDelete({ userId: req.user._id, movieId });
  
      if (!result) return res.status(404).json({ message: "Movie not found in watchlist" });
  
      res.status(200).json({ message: "Removed from watchlist" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  


export {addToWatchlist,getWatchlist,removeFromWatchlist}
