import express from "express"
import authRoutes from "./authRoutes.js"
import userRoutes from "./userRoutes.js"
import movieRoutes from "./movieRoutes.js"
import watchlistRoutes from "./watchlistRoutes.js"
import reviewRoutes from "./reviewRoutes.js";
import favoritesRoutes from "./favoritesRoutes.js"

const router = express.Router()

router.use("/auth", authRoutes)
router.use("/user",userRoutes)
router.use("/movies", movieRoutes)
router.use("/watchlist", watchlistRoutes)
router.use("/reviews", reviewRoutes);
router.use("/favorites",favoritesRoutes)


export default router