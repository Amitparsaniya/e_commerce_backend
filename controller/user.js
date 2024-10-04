import User from "../model/user.js";
import bcrypt from "bcrypt"
import { failure, success } from "../utils/commanfun.js";
import  jwt  from "jsonwebtoken";

export const userCreate  =async (req,res)=>{
    try {
        const {fullName,email,password}= req.body

        const userExist = await User.findOne({email})

        if(userExist){
            return failure(res,"user already exist",401)
        }
        const hashPassword = await bcrypt.hash(password,10)

        await User.create({
            fullname:fullName,
            email:email,
            password:hashPassword,
        })

        return success(res,"user created successfully",201)
    } catch (error) {
        console.log(error);
    }
}

export const loginUser = async (req,res)=>{
    try {
        const {email,password} =req.body

        const userExist = await User.findOne({email})

        if(!userExist){
            return failure(res,"user not exist",404)
        }

        const isValidPassword = await bcrypt.compare(password,userExist.password)

        if(!isValidPassword){
            return failure(res,"email or password is incorrect",200)
        }
        const token = await jwt.sign({id:userExist._id,email:userExist.email},process.env.SECRET_KEY)
        const data ={
          fullname:  userExist.fullname,
          email:userExist.email,
          token
        }
        return success(res,"user login successfully",200,data)
    } catch (error) {
        console.log(error);
    }
}

export const fetchSingleUser = async (req,res)=>{
    try {
        const userDetail  =req.user
        if(!userDetail){
            return failure(res,"user not found!",404)
        }
        return success(res,"user fetched successfully",200,userDetail)
    } catch (error) {
        console.log(error);
    }
}

export const updateUserShippingAddress= async (req,res)=>{
    try {
        const {firstName,lastName,address,city,postalCode,country,phone}=req.body

        const user = await User.findByIdAndUpdate(req.user._id,{
            shippingAddress:{
                firstName,
                lastName,
                address,
                city,
                postalCode,
                country,
                phone
            },
            hasShippingAddress:true
        },{
            new:true
        })

        return success(res,"user shipping address updated successfully",200,user)
    } catch (error) {
        console.log(error);
    }
}