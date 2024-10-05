import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.ATLAS_URI).then(()=>{
    console.log('Connected')
    app.listen(PORT, () => console.log('Server started'))
})