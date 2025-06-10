import express from "express"
import { getMovieInfo, getMovieRecommendations, getMovieTrailer, getPopularMovies, searchMovies } from "../controllers/movieController.js"
import { verifyToken } from "../middleware/authMiddleWare.js"


const router = express.Router()

router.get("/search",verifyToken, searchMovies)
router.get("/popular", verifyToken, getPopularMovies)
router.get("/recommendations",verifyToken, getMovieRecommendations)
router.get('/:id/trailer', verifyToken, getMovieTrailer)
router.get("/:id", verifyToken, getMovieInfo)



export default router 