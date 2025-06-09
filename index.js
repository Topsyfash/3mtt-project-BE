import express from 'express'
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import routes from "./routes/index.js"



dotenv.config()

const app = express()

app.use(cors())

app.use(express.json());

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`Server Running on Port ${PORT}`);
    });
}).catch(err => console.log(err))


app.use("/api",routes)

app.get("/",async (req,res) => {
  res.status(200).json({
    message:"Welcome to Movie App Backend"
  })
})
