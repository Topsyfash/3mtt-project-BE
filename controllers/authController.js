import User from "../models/userModel.js"
import bcrypt  from "bcryptjs"
import jwt from "jsonwebtoken"   
 

const handleUserRegister = async (req,res) => {
    try {
        const { userName, email, password } = req.body
        
        if (!email) {
            return res.status(400).json({ message: "Please Add your email" })
        } 
        if (!password) {
            return res.status(400).json({ message: "Please enter password" })
        }

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).json({ message: "User already exist" })
        }

        if (password.length < 8) {   
            return res.status(400).json({ message: "Password should not be less than 8" })
        }


        const hashedPassword = await bcrypt.hash(password, 12)
        
        const user = new User({
            userName,
            email,
            password:hashedPassword
        })
        await user.save()

        res.status(201).json({
            message: "User Registered Successfully",
            user: { userName, email }
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const handleUserLogin = async (req,res) => {
    try {
        const { email, password } = req.body
        
        const user = await  User.findOne({ email })
        
        if (!user) {
            return res.status(404).json({message:"User Account does not exist"})
        }

        const isMatch = await bcrypt.compare(password, user?.password)

        if (!isMatch) {
            return res.status(400).json({message:"Incorrect email or password"})
        }

        // access Token 
        const access_token = jwt.sign(
            {id:user?._id},
            process.env.JWT_TOKEN,
            {expiresIn:"2d"}
        )

        res.status(200).json({
            message: "Login Successfull",
            token:access_token,
            user: {
                id:user?._id,
                email: user?.email,
                userName:user?.userName
            }
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export {handleUserRegister,handleUserLogin}
