import express from "express"
import { getMovieInfo, getPopularMovies, searchMovies } from "../controllers/movieController.js"


const router = express.Router()

router.get("/search", searchMovies)
router.get("/popular", getPopularMovies)
router.get("/:id",getMovieInfo)


export default router 