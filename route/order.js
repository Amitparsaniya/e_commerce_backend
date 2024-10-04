import express from "express"
import { verifyToken } from "../middleware/tokenverify.js"
import { createOrder, getAllSalesAmount, webhook } from "../controller/order.js"
import config from "../config/config.js"
const orderRouter = express.Router()

orderRouter.post(
    "/create",
    verifyToken,
    createOrder
)

orderRouter.post(
    "/webhook",
    // express.raw({ type: 'application/json' }),
    webhook
)

orderRouter.get(
    "/sales",
    getAllSalesAmount
)

export default orderRouter