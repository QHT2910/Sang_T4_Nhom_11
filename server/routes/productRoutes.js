import express from "express";
import { getProducts, getProductById } from "../controllers/productController.js";
import { login } from "../controllers/userController.js";
const router = express.Router();

router.get("/products", getProducts);
router.get("/products/:id", getProductById);



router.post("/login", login);
export default router;