import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  movieId: { type: Number, required: true }, 
  reviewText: { type: String, required: true },
  rating: { type: Number, min: 0, max: 5 }, 
}, { timestamps: true });

export default mongoose.model("Review", reviewSchema);
