import Coupon from "../model/coupon.js"
import moment  from "moment"
import { failure, success } from "../utils/commanfun.js"

export const createCoupon  = async (req,res)=>{
    try {
        const {code,startDate,endDate,discount}=req.body
        const st = moment.utc(startDate, "MM-DD-YYYY").startOf("day")
        const et = moment.utc(endDate,"MM-DD-YYYY").startOf("day")

        if(!st.isValid()|| !et.isValid()){
            return failure(res,"invalid date enter please enter valid date",400)
        }

        const today = moment().startOf("day")
        if(st.isBefore(today)){
            return failure(res,"start date is can not be past!",400)
        }

        if(et.isBefore(st)){
            return failure(res,"end date is can not be before start date",400)
        }

        if(st.isAfter(et)){
            return failure(res,"start is not greater than end date",400)
        }

        if(discount<=0|| discount>100 ){
            return failure(res,"discount can not be less than 0 and not be greater than 100",400)
        }
        // console.log(/st isbefore today/,st.isBefore(today))
        // console.log(/dfe/,et.isBefore(st));
        // console.log(st.isBefore(et));
        // console.log(/today/,today);
        // const date =new Date()

        // console.log(endDate>date);
        const couponDetail  = await Coupon.create({
            code:code,
            startDate:st.toISOString(),
            endDate:et.toISOString(),
            discount:discount,
            user:req.user._id
        })

        return success(res,"coupon added successfully",200,couponDetail)
    } catch (error) {
        console.log(error);
    }
}


export const getAllCoupon = async (req,res)=>{
    try {
        const couponDetail = await Coupon.find()
        return success(res,"coupon fetched successfully",200,couponDetail)
    } catch (error) {
        console.log(error);
    }
}


export const getSingleCoupon = async (req,res)=>{
    try {
        const id = req.params.Id
        const couponDetail = await Coupon.findById(id)

        if(!couponDetail){
            return failure(res,"coupon detail not found",404)
        }

        return success(res,"coupon detail fetch successfully",200,couponDetail)

    } catch (error) {
        console.log(error);
    }
}

export const updateCoupon = async (req,res)=>{
    try {
        const id = req.params.Id

        const {code,startDate,endDate,discount}=req.body

        const couponDetail = await Coupon.findById(id)

        if(!couponDetail){
            return failure(res,"coupon detail not found",404)
        }

        const st = moment.utc(startDate, "MM-DD-YYYY").startOf("day")
        const ed = moment.utc(endDate,"MM-DD-YYYY").startOf("day")


        if(!st.isValid()|| !et.isValid()){
            return failure(res,"invalid date enter please enter valid date",400)
        }

        const today = moment().startOf("day")

        if(st.isBefore(today)){
            return failure(res,"start date is can not be past!",400)
        }

        if(ed.isBefore(st)){
            return failure(res,"end date is can not be before start date",400)
        }

        if(st.isAfter(ed)){
            return failure(res,"start is not greater than end date",400)
        }

        if(discount<=0|| discount>100 ){
            return failure(res,"discount can not be less than 0 and not be greater than 100",400)
        }
        

        const updateCouponDetail = await Coupon.findByIdAndUpdate(
            couponDetail._id,
            {
                code,
                startDate:st.toISOString(),
                endDate:ed.toISOString(),
                discount,
                user:req.user._id
            },
            {
                new:true
            }
        )
        return success(res,"coupon detail updated successfully",200,updateCouponDetail)
    } catch (error) {
        console.log(error);
    }
}


