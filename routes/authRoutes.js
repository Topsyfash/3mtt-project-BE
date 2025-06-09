import express from "express"
import { handleUserLogin, handleUserRegister } from "../controllers/authController.js"
import { validateUserRegistration } from "../middleware/authMiddleWare.js"


const router = express.Router()

router.post("/register",validateUserRegistration, handleUserRegister)

router.post("/login", handleUserLogin)
 

export default router