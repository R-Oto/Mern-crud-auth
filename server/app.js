import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import postRouter from './routes/postsRoutes.js'
import userRouter from './routes/usersRoutes.js'

dotenv.config();

const app = express()
const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(cors())
app.use("/api/posts", postRouter)
app.use("/api/users", userRouter)

mongoose.connect(process.env.ATLAS_URI).then(()=>{
    console.log('Connected')
    app.listen(PORT, () => console.log('Server started'))
}).catch((error)=>{
    console.log(error)
    process.exit(1)
})