import User from "../model/user.js";
import { failure } from "../utils/commanfun.js";


export const isAdmin = async (req,res,next)=>{
    try {
        const user = await User.findById(req.user._id)
        if(user?.isAdmin){
            next()
        }else{
            return failure(res,"access denied only for admin user",400)
        }
    } catch (error) {
        console.log(error);
    }
}