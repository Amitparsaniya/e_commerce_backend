import express from "express"
import { createCategory, removeCategory, singleCategory, updateCategory } from "../controller/category.js"
import { verifyToken } from "../middleware/tokenverify.js"

const categoryRouter = express.Router()

categoryRouter.post(
    "/create",
    verifyToken,
    createCategory
)

categoryRouter.get(
    "/:Id",
    verifyToken,
    singleCategory
)

categoryRouter.patch(
    "/update/:Id",
    verifyToken,
    updateCategory
)

categoryRouter.delete(
    "/delete/:Id",
    verifyToken,
    removeCategory
)

export default categoryRouter