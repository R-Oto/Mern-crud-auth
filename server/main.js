import express from 'express';
import dotenv from 'dotenv'
import goalRouter from './routes/goalRoute.js'

dotenv.config()

const PORT = process.env.PORT || 5000;
const app = express();

app.use("/api/goals", goalRouter)

app.listen(PORT, () => console.log("Server started"));