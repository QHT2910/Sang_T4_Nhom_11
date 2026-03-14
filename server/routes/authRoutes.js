import express from "express";
import { login, register } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
// Backward-compatible aliases for clients calling /api/users/*
router.post("/users/login", login);
router.post("/users/register", register);

export default router;
