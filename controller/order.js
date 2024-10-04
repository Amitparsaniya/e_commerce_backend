import Order from "../model/order.js";
import Product from "../model/product.js";
import { failure, success } from "../utils/commanfun.js";
import config from "../config/config.js";
import Stripe from "stripe";
import Coupon from "../model/coupon.js";
import moment from "moment";

const stripe =new Stripe(config.STRIPE_KEY)


export const createOrder = async (req,res) =>{
    try {
        const  {orderItems,shippingAddress,totalPrice} =req.body
        console.log(req.query);


        // const totalPriceAmount = orderItems.map((item)=>{
        //     return item.price
        // })
        // let totalPriceAmount=0;
        // for(let i =0;i<orderItems.length;i++){
        //    totalPriceAmount = totalPriceAmount+ orderItems[i].price
        // }

        // console.log(/totalPriceAmount/,totalPriceAmount);

        // console.log(req.body);
        let couponDetail
        if(req.query.code){
             couponDetail =await Coupon.findOne({
                code:req.query.code
            })

            if(couponDetail.isExpired){
                return failure(res,"coupon has expired",400)
            }

            if(!couponDetail){
                return failure(res,"coupon not found",404)
            }
        }

        const discountValue =  couponDetail.discount? couponDetail.discount/100: 0
        console.log(/couponDetail.discount/,couponDetail.discount/100)
        console.log(/discountValue/,discountValue);
        console.log(/totalPrice- totalPrice*discountValue/,totalPrice- totalPrice*discountValue);

        const order = await Order.create({
            user:req.user._id,
            orderItems,
            shippingAddress,
            totalPrice : couponDetail.discount? totalPrice- totalPrice*discountValue:totalPrice
        })
        console.log(order);



        const products = await Product.find({_id:{$in:orderItems}})
        console.log(/products/,products);

        orderItems.map(async (order)=>{
            const product = products.find((product)=>{
                return product._id.toString()===order._id.toString()
            })

            if(product){
                product.totalSold +=order.qty
            }
            await product.save()
        })

        req.user.orders.push(order._id)
        await req.user.save()

        const convertedOrder = orderItems.map((item)=>{
            return {
                price_data:{
                    currency:'usd',
                    product_data:{
                        name:item.name,
                    },
                    unit_amount:item.price *100
                },
                quantity:item.qty
            }
        })

        console.log(/convertOrder/,convertedOrder);
        console.log(/convertOrder/,convertedOrder[0].price_data.product_data);

       const r1= convertedOrder.map((val)=>{
            return val.price_data.product_data
        })
        console.log(/r1/,r1);

        const session = await stripe.checkout.sessions.create({
            line_items:convertedOrder,
            mode:"payment",
            success_url:"http://localhost:3000/sucess",
            cancel_url:"http://localhost:3000/cancel"
        })

        const data ={
            url:session.url,
            order
        }

        return success(res,"order created successfully",200,data)
    } catch (error) {
        console.log(error);
    }
}


export const webhook = async (req,res)=>{
    try {
        // console.log(/rqaas/,req.body);
        const sig = req.headers['stripe-signature']
         
        const endPointSecret = 'whsec_dc2eea1010a21d2f9625982b3aa1b4c1efb7f9837e7cd5a48f879f393ca1c2dd'
        let event
            event = stripe.webhooks.constructEvent(req.rawBody,sig,endPointSecret)


        switch(event.type){
            case "checkout.session.async_payment_succeeded":
             console.log(/event1 triggered   checkout.session.async_payment_succeeded/);
            break;

            case "payment_intent.created":
              console.log(/event 2 triggered payment_intent.created/);
            break;
            case "payment_intent.succeeded":
                console.log(/event 3 triggered payment_intent.succeeded/);
            break;
            default :
            console.log(`Unhandled event type ${event.type}`);
        }

        return res.json({received: true});

    } catch (error) {
        console.log(error);
    }
}



export const getAllSalesAmount = async (req,res)=>{
    try {
        const totalSales= await Order.aggregate([
            {
                $group:{
                    _id:null,
                    totalSales:{
                        $sum:"$totalPrice"
                    }
                }
            }

        ])

        const orderOverView = await Order.aggregate([
            {
                $group:{
                    _id:null,
                    totalSales:{
                        $sum:"$totalPrice"
                    },
                    minimumSale:{
                        $min:"$totalPrice"
                    },
                    maxSales:{
                        $max:"$totalPrice"
                    },
                    averageSale:{
                        $avg:"$totalPrice"
                    },

                }
            }
        ])
        console.log("~~~~~");
        const dd  = moment().startOf("day")
        console.log(/dd/,dd);
        console.log(/iso/,dd.toISOString());
        console.log(/format/,dd.format("DD-MM-YYYY"));
        console.log(/utc format/,dd.utc().format());

        const date = new Date();
        const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());


        const todaySale = await Order.aggregate([
            {
                $match:{
                    createdAt:{
                        $gte:today
                    }
                }
            },
            {
                $group:{
                    _id:null,
                    totalSales:{
                        $sum:"$totalPrice"
                    }
                }
            }
        ])

        const data={
            orderOverView,
            todaySale
        }


        // const maxOrder = await Order.aggregate([
        //     {
        //         $group:{
        //             _id:null,
        //             maxSales:{
        //                 $max:"$totalPrice"
        //             }
        //         }
        //     }
        // ])

        // const averageOrder = await Order.aggregate([
        //     {
        //         $group:{
        //             _id:null,
        //             averageSale:{
        //                 $avg:"$totalPrice"
        //             }
        //         }
        //     }
        // ])

        // const data={
        //     totalSales,
        //     minimumOrder,
        //     maxOrder,
        //     averageOrder
        // }

        return success(res,"total sales fetch successfully",200,data)
    } catch (error) {
        console.log(error);
    }
}