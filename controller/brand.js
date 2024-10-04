import Brand from "../model/brand.js";
import { failure, success } from "../utils/commanfun.js";

export const createBrand = async (req,res)=>{
    try {
        const {name} =req.body

        const brandDetail =await Brand.findOne({name:name.toLowerCase()})

        if(brandDetail){
            return failure(res,"brand already exist",400)
        }

        await Brand.create({
            name:name.toLowerCase(),
            user:req.user._id
        })

        return success(res,"brand created successfully",200)
    } catch (error) {
        console.log(error);
    }
}


export const singleBrand = async (req,res)=>{
    try {
         const id = req.params.Id

         const brandDetail =await Brand.findById(id)

         if(!brandDetail){
            return failure(res,"brand not found",404)
         }

         return success(res,"brand fetched successfully",200,brandDetail)
    } catch (error) {
        console.log(error);
    }
}

export const updateBrand = async (req,res)=>{
    try {
        const id = req.params.Id
        const {name} =req.body
         const brandDetail =await Brand.findById(id)

         if(!brandDetail){
            return failure(res,"brand not found",404)
         }

        brandDetail.name = name
        await brandDetail.save()

         return success(res,"brand updated successfully",200,brandDetail)

    } catch (error) {
        console.log(error);
    }
}

export const  removeBrand  = async (req,res)=>{
    try {
        const id = req.params.Id
         const brandDetail =await Brand.findById(id)

         if(!brandDetail){
            return failure(res,"brand not found",404)
         }

         await Brand.findByIdAndDelete(id)

         return success(res,"brand removed successfully",200)
    } catch (error) {
        console.log(error);
    }
}