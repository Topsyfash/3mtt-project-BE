import mongoose from "mongoose";

const favoriteMovieSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    movieId: Number, 
    movieData: Object,  
  }, { timestamps: true });
  
  export default mongoose.model("FavoriteMovie", favoriteMovieSchema);
  