import axios from "axios";
import Product from "../models/productModel.js";

// Cấu hình chung cho Ngrok
const NGROK_HEADERS = {
  "ngrok-skip-browser-warning": "true",
  "Content-Type": "application/json"
};

const BASE_URL = "https://plumiest-procivic-jules.ngrok-free.dev/api/products/";

export const getProducts = async (req, res) => {
  try {
    const response = await axios.get(BASE_URL, { headers: NGROK_HEADERS });
    const products = response.data.map((p) => new Product(p));
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`${BASE_URL}${id}/`, { headers: NGROK_HEADERS });
    const product = new Product(response.data);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const formData = new FormData();
    formData.append("name", req.body.name);
    formData.append("description", req.body.description);
    formData.append("price", req.body.price);
    formData.append("stock", req.body.stock);
    formData.append("image", req.file); // nếu file được upload từ client

    const response = await axios.post(BASE_URL, formData, {
      headers: {
        ...NGROK_HEADERS,
        "Content-Type": "multipart/form-data"
      }
    });

    res.status(201).json(response.data);
  } catch (error) {
    console.error("LỖI DJANGO (CREATE):", error.response?.data || error.message);
    res.status(500).json({ message: "Django rejected the data. Check terminal for details." });
  }
}
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    // THÊM HEADERS Ở ĐÂY
    const response = await axios.patch(`${BASE_URL}${id}/`, req.body, { 
      headers: NGROK_HEADERS 
    });
    const product = new Product(response.data);
    res.json(product);
  } catch (error) {
    console.error("LỖI DJANGO (UPDATE):", error.response?.data || error.message);
    res.status(500).json({ message: "Error updating product" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    // THÊM HEADERS Ở ĐÂY
    await axios.delete(`${BASE_URL}${id}/`, { headers: NGROK_HEADERS });
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
};