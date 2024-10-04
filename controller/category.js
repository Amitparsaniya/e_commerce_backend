import Category from "../model/category.js";
import { failure, success } from "../utils/commanfun.js";

export const createCategory = async (req,res)=>{
    try {
        const {name} =req.body
        const categoryDetail = await Category.findOne({name})

        if(categoryDetail){
            return failure(res,"category already exist",400)
        }

        await Category.create({
            name:name.toLowerCase(),
            user:req.user._id
        })

        return success(res,"category created successfully",200)
    } catch (error) {
        console.log(error);
    }
}


export const singleCategory  = async (req,res)=>{
    try {
        const id = req.params.Id

        const categoryDetail  = await Category.findById(id)

        if(!categoryDetail){
            return failure(res,"category not found",404)
        }

        return success(res,"category fetched successfully",200,categoryDetail)


    } catch (error) {
        console.log(error);
    }
}


export const updateCategory = async (req,res)=>{
    try {
        const id = req.params.Id
        const {name}= req.body

        const categoryDetail  = await Category.findById(id)

        if(!categoryDetail){
            return failure(res,"category not found",404)
        }

       const data =  await Category.findByIdAndUpdate(id,{
            name
        },{
            new:true
        })

        return success(res,"category updated successfully",200,data)


    } catch (error) {
        console.log(error);
    }
}


export const removeCategory = async (req,res)=>{
    try {
        const id = req.params.Id

        const categoryDetail = await Category.findById(id)

        if(!categoryDetail){
            return failure(res,"category not found",404)
        }

        await Category.findByIdAndDelete(id)

        return success(res,"category removed successfully",200)

    } catch (error) {
        console.log(error);
    }
}