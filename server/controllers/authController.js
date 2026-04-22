import axios from "axios";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const SECRET_KEY = process.env.SECRET_KEY || "secret-key";
const NGROK_HEADERS = { "ngrok-skip-browser-warning": "true" };

const API_URL =
  "https://plumiest-procivic-jules.ngrok-free.dev/api/user";

const isDjangoPbkdf2Hash = (value) =>
  typeof value === "string" && value.startsWith("pbkdf2_sha256$");

const verifyDjangoPbkdf2Password = (plainPassword, encodedPassword) => {
  const [algorithm, iterationsText, salt, storedHash] = String(encodedPassword).split("$");
  if (algorithm !== "pbkdf2_sha256" || !iterationsText || !salt || !storedHash) {
    return false;
  }

  const iterations = Number(iterationsText);
  if (!Number.isInteger(iterations) || iterations <= 0) {
    return false;
  }

  const derivedKey = crypto.pbkdf2Sync(
    String(plainPassword),
    salt,
    iterations,
    32,
    "sha256"
  );

  return derivedKey.toString("base64") === storedHash;
};

const verifyPassword = (plainPassword, storedPassword) => {
  if (typeof storedPassword !== "string" || storedPassword.length === 0) {
    return false;
  }

  if (isDjangoPbkdf2Hash(storedPassword)) {
    return verifyDjangoPbkdf2Password(plainPassword, storedPassword);
  }

  return String(plainPassword) === storedPassword;
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  try {
    const response = await axios.get(API_URL, {
      headers: NGROK_HEADERS,
    });
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

    const passwordIsValid = verifyPassword(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({
        message: "Password is incorrect",
      });
    }

    const token = jwt.sign(
      {
        id: user.user_id,
        username: user.username,
        role: user.role,
      },
      SECRET_KEY,
      { expiresIn: "1h" }
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
        ...NGROK_HEADERS,
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
