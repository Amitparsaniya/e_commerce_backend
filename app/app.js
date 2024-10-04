// import dotenv from "dotenv"
// dotenv.config()

import express from "express"
import db from "../config/db.js"
import userRoute from "../route/user.js"
import productRouter from "../route/product.js"
import categoryRouter from "../route/category.js"
import brandRouter from "../route/brand.js"
import orderRouter from "../route/order.js"
import couponRouter from "../route/coupon.js"
db()
const app =express()
app.use(express.json({verify:(req,res,buf)=>{
    req.rawBody=buf
}}))


app.use("/",userRoute)
app.use("/product",productRouter)
app.use("/category",categoryRouter)
app.use("/brand",brandRouter)
app.use("/order",orderRouter)
app.use("/coupon",couponRouter)

export default app