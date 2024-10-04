import express from "express"
import { fetchSingleUser, loginUser, updateUserShippingAddress, userCreate } from "../controller/user.js"
import { verifyToken } from "../middleware/tokenverify.js"

const userRoute  = express.Router()


userRoute.post(
    "/create",
     userCreate
)

userRoute.post(
    "/user-login",
    loginUser
)

userRoute.get(
    "/fetch-user",
    verifyToken,
    fetchSingleUser
)

userRoute.patch(
    "/update-shipping-address",
    verifyToken,
    updateUserShippingAddress
)

export default userRoute