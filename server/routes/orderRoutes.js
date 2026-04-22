import express from "express";
import { authMiddleware, requireRoles } from "../middleware/authMiddleware.js";
import { 
    getOrders, 
    getUserOrders, 
    deleteOrder, 
    createOrder, 
    updateOrderStatus 
} from "../controllers/orderController.js";

const router = express.Router();


router.get("/order", authMiddleware, requireRoles("admin", "superadmin"), getOrders);


router.get("/user/order", authMiddleware, getUserOrders);


router.post("/order", authMiddleware, createOrder);


router.patch("/order/:id/update_status", authMiddleware, updateOrderStatus);


router.delete("/order/:id", authMiddleware, requireRoles("admin", "superadmin"), deleteOrder);

export default router;
