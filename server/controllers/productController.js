import axios from "axios";
import Product from "../models/productModel.js";
import FormData from "form-data";

// XÓA Content-Type ở đây vì nó sẽ thay đổi tùy theo loại request
const NGROK_HEADERS = {
  "ngrok-skip-browser-warning": "true",
};

const BASE_URL = "https://plumiest-procivic-jules.ngrok-free.dev/api/products/";

export const getProducts = async (req, res) => {
  try {
    const response = await axios.get(BASE_URL, { 
      headers: { ...NGROK_HEADERS, "Content-Type": "application/json" } 
    });
    const products = response.data.map((p) => new Product(p));
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`${BASE_URL}${id}/`, { 
      headers: { ...NGROK_HEADERS, "Content-Type": "application/json" } 
    });
    const product = new Product(response.data);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const form = new FormData();
    form.append("name", req.body.name);
    form.append("description", req.body.description || "");
    form.append("price", req.body.price);
    form.append("stock", req.body.stock || 0);
    form.append("brand", req.body.brand || "");
    form.append("sold", req.body.sold || 0);
    form.append("tag", req.body.tag || "");

    // Xử lý tệp tin từ multer (req.file)
    if (req.file) {
      form.append("image", req.file.buffer, {
        filename: req.file.originalname,
        contentType: req.file.mimetype,
      });
    }

    const response = await axios.post(BASE_URL, form, {
      headers: {
        ...form.getHeaders(), // QUAN TRỌNG: Tự tạo Content-Type multipart với boundary
        ...NGROK_HEADERS,
      },
    });

    res.status(201).json(response.data);
  } catch (error) {
    console.error("LỖI DJANGO (CREATE):", error.response?.data || error.message);
    res.status(500).json({ message: "Django rejected the data. Check terminal for details." });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const form = new FormData();
    form.append("name", req.body.name);
    form.append("description", req.body.description || "");
    form.append("price", req.body.price);
    form.append("stock", req.body.stock || 0);

    if (req.file) {
      form.append("image", req.file.buffer, {
        filename: req.file.originalname,
        contentType: req.file.mimetype,
      });
    }

    const response = await axios.patch(`${BASE_URL}${id}/`, form, {
      headers: {
        ...form.getHeaders(),
        ...NGROK_HEADERS,
      },
    });
    res.json(new Product(response.data));
  } catch (error) {
    console.error("LỖI DJANGO (UPDATE):", error.response?.data || error.message);
    res.status(500).json({ message: "Error updating product" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await axios.delete(`${BASE_URL}${id}/`, { 
      headers: { ...NGROK_HEADERS, "Content-Type": "application/json" } 
    });
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
};