import mongoose from "mongoose";
const randomTxt = Math.random().toString(36).substring(7)
const randomNumber = Math.floor(1000+ Math.random()*9000)
const orderSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    orderItems:[
        {
            type:Object,
            required:true
        }
    ],
    shippingAddress:{
        type:Object,
        required:true
    },
    orderNumber:{
        type:String,
        default:randomTxt+randomNumber
    },
    paymentStatus:{
        type:String,
        default:"Not paid"
    },
    paymentMethod: {
        type: String,
        default: "Not specified",
    },
    totalPrice: {
        type: Number,
        default: 0.0,
    },
    currency: {
        type: String,
        default: "Not specified",
    },
    status:{
        type:String,
        default:"pending",
        enum:["pending","processing", "shipped", "delivered"]
    },
    deliveredAt:{
        type:Date
    }
},{
    timestamps:true
})

const Order = mongoose.model("Order",orderSchema)

export default Order