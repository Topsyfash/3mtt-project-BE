import express from "express";
import { addToWatchlist, getWatchlist, removeFromWatchlist } from "../controllers/watchlistController.js";
import { verifyToken } from "../middleware/authMiddleWare.js";

const router = express.Router();

router.post("/", verifyToken, addToWatchlist);
router.get("/", verifyToken, getWatchlist);
router.delete("/:movieId", verifyToken, removeFromWatchlist);

export default router;
