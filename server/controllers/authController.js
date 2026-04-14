import axios from "axios";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const SECRET_KEY = process.env.SECRET_KEY || "secret-key";

const API_URL =
  "https://plumiest-procivic-jules.ngrok-free.dev/api/user";
;

export const login = async (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }

  try {
    const response = await axios.get(API_URL);
    const users = response.data.map((u) => new User(u));
    const normalized = String(username).toLowerCase();
    const user = users.find((u) => {
      const uName = String(u.username || "").toLowerCase();
      const uEmail = String(u.email || "").toLowerCase();
      return uName === normalized || uEmail === normalized;
    });

    if (!user) {
      return res.status(401).json({
        message: "Username not found",
      });
    }

    const token = jwt.sign(
      {
        id: user.user_id,
        username: user.username,
        role: user.role,
      },
      SECRET_KEY,
      { expiresIn: "15m" }
    );

    res.json({
      message: "Login success",
      token,
      role: user.role,
      user,
    });
  } catch (error) {
    const status = error?.response?.status || 500;
    const data = error?.response?.data;
    res.status(status).json({
      message:
        data?.message ||
        data?.detail ||
        error?.message ||
        "Login error",
      details: data,
    });
  }
};

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Username, email, and password are required",
    });
  }

  try {
    const payload = { username, email, password };

    const response = await axios.post(API_URL, payload, {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    });

    const user = new User(response.data);

    res.status(201).json({
      message: "Register success",
      user,
    });
  } catch (error) {
    const status = error?.response?.status || 500;
    const data = error?.response?.data;

    console.error("[REGISTER] Upstream error", {
      status,
      data,
      message: error?.message,
    });

    res.status(status).json({
      message:
        data?.message || data?.detail || error?.message || "Register error",
      details: data,
    });
  }
};
