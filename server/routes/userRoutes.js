import express from "express";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../controllers/adminUserController.js";
import { authMiddleware, requireRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/users", authMiddleware, requireRoles("admin", "superadmin"), getUsers);
router.post("/users", authMiddleware, requireRoles("admin", "superadmin"), createUser);
router.put("/users/:id", authMiddleware, requireRoles("admin", "superadmin"), updateUser);
router.delete("/users/:id", authMiddleware, requireRoles("admin", "superadmin"), deleteUser);

export default router;
