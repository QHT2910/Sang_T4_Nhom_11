import express from "express";
import { getProducts, getProductById,updateProduct,createProduct,deleteProduct } from "../controllers/productController.js";
import { authMiddleware } from "../middleware/authmiddleware.js";
import multer from "multer";
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
router.get("/products", getProducts);
router.get("/products/:id", getProductById);
router.post("/products", authMiddleware,upload.single("image"), createProduct);
router.patch("/products/:id", authMiddleware, upload.single("image"), updateProduct);
router.delete("/products/:id", authMiddleware, deleteProduct);

export default router;
