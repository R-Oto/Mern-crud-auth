import jwt from 'jsonwebtoken'
import User from '../models/usersModel.js'
import dotenv from 'dotenv'

dotenv.config()

const auth = async (req,res,next) => {
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({error:""})
    }
    const token = authorization.split("")[1]
    try{
        const {_id} = jwt.verify(token, process.env.JWT)
        req.user = await User.findById(_id).select("_id")
        next()
    }catch(error){
        res.status(401).json({error:error.message})
    }
}

export default auth;