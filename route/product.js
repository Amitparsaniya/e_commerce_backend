import express from "express"
import { createProduct, filterProduct, getProducsts, removeProduct, updateProduct } from "../controller/product.js"
import { verifyToken } from "../middleware/tokenverify.js"
import { isAdmin } from "../middleware/admin.js"

const productRouter = express.Router()

productRouter.post(
    "/create",
    verifyToken,
    isAdmin,
    createProduct
)

productRouter.get(
    "/products",
    getProducsts
)

productRouter.get(
    "/list",
    filterProduct
)

productRouter.patch(
    "/update/:Id",
    verifyToken,
    updateProduct
)

productRouter.delete(
    "/delete/:Id",
    verifyToken,
    isAdmin,
    removeProduct
)

export default productRouter