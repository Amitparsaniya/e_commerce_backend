import jwt from "jsonwebtoken"
import { failure } from "../utils/commanfun.js"
import User from "../model/user.js"


export const verifyToken =async (req,res,next)=>{
    try {
        const token = req.header("Authorization")?.split(" ")[1]

        const verifyToken = await jwt.verify(token,process.env.SECRET_KEY)

        if(!verifyToken){
            return failure(res,"token is expired",404)
        }

        const userDetail = await User.findOne({
            email:verifyToken.email
        }).select("-password")
        if(!userDetail){
            return failure(res,"user not found",404)
        }
        req.user = userDetail
        next()
    } catch (error) {
        return failure(res,"invalid token",400,error.message)
        console.log(error);
    }
}