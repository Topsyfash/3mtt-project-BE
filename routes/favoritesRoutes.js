import express from "express";
import { verifyToken } from "../middleware/authMiddleWare.js";
import { addFavorite, getfavoriteMovies, removefavorite } from "../controllers/favoritesController.js";

const router = express.Router();

router.post("/", verifyToken, addFavorite);
router.get("/", verifyToken, getfavoriteMovies);
router.delete("/:movieId", verifyToken, removefavorite);

export default router;
