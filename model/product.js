import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    category:{
        type:String,
        ref:"Category",
        required:true
    },
    sizes:{
        type:[String],
        enum:["s","M","L","XL","XXL"],
        required:true
    },
    colors:{
        type:[String],
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    images: [
        {
          type: String,
          required: true,
        },
      ],
  
      reviews: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Review",
        },
      ],
  
      price: {
        type: Number,
        required: true,
      },
  
      totalQty: {
        type: Number,
        required: true,
      },
      totalSold: {
        type: Number,
        required: true,
        default: 0,
      },
},{
    timestamps:true,
    toJSON:{virtuals:true}
})

productSchema.virtual("qtyLeft").get(function(){
  const product=this
   return product.totalQty-product.totalSold
})

const Product = mongoose.model("Product",productSchema)

export default Product