import express from "express"
import { verifyToken } from "../middleware/authMiddleWare.js"
import { getProfile,updateProfile} from "../controllers/userController.js"


const router = express.Router()


router.get("/profile", verifyToken, getProfile)
router.patch("/profile", verifyToken, updateProfile)


export default router