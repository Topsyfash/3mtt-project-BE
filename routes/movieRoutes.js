import express from "express"
import { getMovieInfo, getMovieTrailer, getPopularMovies, searchMovies } from "../controllers/movieController.js"
import { verifyToken } from "../middleware/authMiddleWare.js"


const router = express.Router()

router.get("/search",verifyToken, searchMovies)
router.get("/popular",verifyToken, getPopularMovies)
router.get("/:id", verifyToken, getMovieInfo)
router.get('/:id/trailer',verifyToken,getMovieTrailer)


export default router 