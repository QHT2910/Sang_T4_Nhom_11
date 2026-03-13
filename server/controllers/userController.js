import axios from "axios";
import User from "../models/userModel.js";

const API_URL =
  "https://plumiest-procivic-jules.ngrok-free.dev/api/user/";

export const getUsers = async (req, res) => {
  try {

    const response = await axios.get(API_URL);

    const users = response.data.map((u) => new User(u));

    res.json(users);

  } catch (error) {

    res.status(500).json({
      message: "Không lấy được danh sách user",
    });

  }
};

export const getUserById = async (req, res) => {

  const { id } = req.params;

  try {

    const response = await axios.get(`${API_URL}${id}/`);

    const user = new User(response.data);

    res.json(user);

  } catch (error) {

    res.status(404).json({
      message: "User không tồn tại",
    });

  }

};

import jwt from "jsonwebtoken";

const SECRET_KEY = "secret-key";

export const login = async (req, res) => {

  const { username } = req.body;

  try {

    const response = await axios.get(API_URL);

    const users = response.data.map((u) => new User(u));

    const user = users.find((u) => u.username === username);

    if (!user) {
      return res.status(401).json({
        message: "Sai username",
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

    res.status(500).json({
      message: "Login error",
    });

  }
};
