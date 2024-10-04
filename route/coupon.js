import express from "express"
import { createCoupon, getAllCoupon, getSingleCoupon, updateCoupon } from "../controller/coupon.js"
import { verifyToken } from "../middleware/tokenverify.js"

const couponRouter = express.Router()


couponRouter.post(
    "/create",
    verifyToken,
    createCoupon
)

couponRouter.get(
    "/",
    getAllCoupon
)

couponRouter.get(
    "/:Id",
    getSingleCoupon
)

couponRouter.patch(
    "/update/:Id",
    verifyToken,
    updateCoupon
)

export default couponRouter