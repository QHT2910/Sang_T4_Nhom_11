import express from "express";
import { getProducts, getProductById,updateProduct,createProduct,deleteProduct } from "../controllers/productController.js";
import { authMiddleware } from "../middleware/authmiddleware.js";
const router = express.Router();

router.get("/products", getProducts);
router.get("/products/:id", getProductById);
router.post("/products", authMiddleware, createProduct);
router.patch("/products/:id", authMiddleware, updateProduct);
router.delete("/products/:id", authMiddleware, deleteProduct);

export default router;
