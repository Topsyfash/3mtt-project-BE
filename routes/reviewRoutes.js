import express from "express";
import { addReview, getMovieReviews, deleteReview } from "../controllers/reviewController.js";
import { verifyToken } from "../middleware/authMiddleWare.js";

const router = express.Router();

router.post("/", verifyToken, addReview);
router.get("/",verifyToken, getMovieReviews);
router.delete("/:movieId", verifyToken, deleteReview);

export default router; 
