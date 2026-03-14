import axios from "axios";
import User from "../models/userModel.js";

const API_BASE_URL =
  "https://plumiest-procivic-jules.ngrok-free.dev/api/user";
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});
const listUrl = () => "/";
const detailUrl = (userId) => `/${userId}/`;

export const getUsers = async (req, res) => {
  try {
    const response = await api.get(listUrl());
    const users = response.data.map((u) => new User(u));
    res.json(users);
  } catch (error) {
    const status = error?.response?.status || 500;
    res.status(status).json({
      message: error?.response?.data?.detail || "Failed to fetch users",
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const response = await api.post(listUrl(), req.body);
    const user = new User(response.data);
    res.status(201).json(user);
  } catch (error) {
    const status = error?.response?.status || 500;
    res.status(status).json({
      message: error?.response?.data?.detail || "Failed to create user",
    });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Missing user id" });
  }
  try {
    const response = await api.patch(detailUrl(id), req.body);
    const user = new User(response.data);
    res.json(user);
  } catch (error) {
    const status = error?.response?.status || 500;
    res.status(status).json({
      message: error?.response?.data?.detail || "Failed to update user",
    });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Missing user id" });
  }
  try {
    const requesterRole = req.user?.role;
    if (!requesterRole) {
      return res.status(403).json({ message: "Missing role" });
    }

    const targetResponse = await api.get(detailUrl(id));
    const targetUser = targetResponse.data;
    const isProtectedTarget =
      targetUser?.is_staff === true || targetUser?.is_active === true;

    if (isProtectedTarget && requesterRole !== "superadmin") {
      return res.status(403).json({
        message:
          "Only superusers can delete staff or active accounts",
      });
    }

    await api.delete(detailUrl(id));
    res.status(204).send();
  } catch (error) {
    const status = error?.response?.status || 500;
    const data = error?.response?.data;
    console.error("[DELETE USER] Upstream error", {
      status,
      data,
      message: error?.message,
    });
    res.status(status).json({
      message: data?.detail || data?.message || "Failed to delete user",
      details: data,
    });
  }
};
