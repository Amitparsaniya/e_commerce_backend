import Brand from "../model/brand.js";
import Category from "../model/category.js";
import Product from "../model/product.js";
import { failure, success } from "../utils/commanfun.js";


export const createProduct = async (req,res)=>{
    try {
        const {name,description,category,sizes,colors,price,totalQty,brand}=req.body
        const userDetail = req.user._id
        const productExist = await Product.findOne({name})

        if(productExist){
            return failure(res,"product is already exist",400)
        }

        const categoryDetail = await Category.findOne({name:category.toLowerCase()})

        if(!categoryDetail){
            return  failure(res,"category not found with category name , please add first category",404)
        }

        const brandDetail =await Brand.findOne({name:brand.toLowerCase()})

        if(!brandDetail){
            return  failure(res,"brand not found with brand name , please add first brand",404)
        }

       const product= await Product.create({
            name:name,
            description:description,
            category:category.toLowerCase(),
            sizes:sizes,
            colors:colors,
            user:userDetail,
            price:price,
            totalQty:totalQty,
            brand:brand.toLowerCase()
        })

         categoryDetail.products.push(product._id)
         await categoryDetail.save()
         brandDetail.products.push(product._id)
         await brandDetail.save()
        return success(res,"product created successfully",200,product)
    } catch (error) {
        console.log(error);
    }
}

export const  getProducsts = async (req,res)=>{
    try {
        const products = await Product.find()
        if(products.length==0){
            return failure(res,"product is not active right now",404)
        }
        return success(res,"product is fetched successfully",200,products)
    } catch (error) {
        console.log(error);
    }
}

export const filterProduct = async (req,res)=>{
    try {
        const page =Number(req.query.page) ||1
            const limit = Number(req.query.limit) || 10
            console.log(limit);
            const skip = (page-1) *limit
        let productDetail =await Product.find().skip(skip).limit(limit)
        if(req.query.name){
             productDetail = await Product.find({
                name:{$regex:req.query.name, $options:"i"}
            })
        }

        if(req.query.brand){
            productDetail =await Product.find({
                brand:{$regex:req.query.brand,$options:"i"}
            })
        }

        if(req.query.size){
            productDetail = await Product.find({
                sizes:{$regex:req.query.size,$options:"i"}
            })
        }

        if(req.query.color){
            productDetail= await Product.find({
                colors:{$regex:req.query.color,$options:"i"}
            })
        }

        if(req.query.price){
            const priceRange =req.query.price.split("-")
            productDetail =await Product.find({
                price:{$gte:priceRange[0],$lte:priceRange[1]}
            })
        }

        // if(req.query.page || req.query.limit){
        //     const page =Number(req.query.page) ||1
        //     const limit = Number(req.query.limit) || 10

        //     const skip = (page-1) *limit

        //     productDetail = a

        // }

        const count  = await productDetail.length
        const data ={
            count,
            productDetail
        }
        return success(res,"product find successfully",200,data)
    } catch (error) {
        console.log(error);
    }
}


export const updateProduct = async (req,res)=>{
    try {
        const id= req.params.Id
        console.log(id);
        const productDetail=await Product.findOne({_id:id})
        if(!productDetail){
            return failure(res,"product not found",404)
        }
        const {name,description,brand,category,sizes,colors,price,totalQty} = req.body

        const product = await Product.findByIdAndUpdate(id,{
            name,
            description,
            brand,
            category,
            sizes,
            colors,
            user:req.user._id,
            price,
            totalQty
        },{
            new:true
        })

        return success(res,"product updated successfully",200,product)
        

    } catch (error) {
        console.log(error);
    }
}

export const removeProduct = async (req,res)=>{
    try {
        const id =req.params.Id
        const productDetail=await Product.findById(id)
        
        if(!productDetail){
            return failure(res,"product not found",404)
        }
        await Product.findByIdAndDelete(id)

        return success(res,"product removed successfully",200)
    } catch (error) {
        console.log(error);
    }
}