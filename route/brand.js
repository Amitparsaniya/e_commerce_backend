import express from "express"
import { createBrand, removeBrand, singleBrand, updateBrand } from "../controller/brand.js"
import { verifyToken } from "../middleware/tokenverify.js"

const brandRouter = express.Router()

brandRouter.post(
    "/create",
    verifyToken,
    createBrand
)

brandRouter.get(
    "/single/:Id",
    singleBrand
)

brandRouter.patch(
    "/update/:Id",
    updateBrand
)

brandRouter.delete(
    "/delete/:Id",
    removeBrand
)

export default brandRouter