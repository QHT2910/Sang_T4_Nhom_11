import axios from "axios";
import Product from "../models/productModel.js";
import FormData from "form-data";

const NGROK_HEADERS = { "ngrok-skip-browser-warning": "true" };
const BASE_URL = "https://plumiest-procivic-jules.ngrok-free.dev/api/products/";
const CAT_URL = "https://plumiest-procivic-jules.ngrok-free.dev/api/category";

// 1. Lấy danh sách sản phẩm
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

// 2. Lấy chi tiết sản phẩm
export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`${BASE_URL}${id}/`, { 
      headers: { ...NGROK_HEADERS, "Content-Type": "application/json" } 
    });
    res.json(new Product(response.data));
  } catch (error) {
    res.status(500).json({ message: "Error fetching product" });
  }
};

// 3. Tạo sản phẩm mới
export const createProduct = async (req, res) => {
  try {
    const form = new FormData();
    form.append("name", req.body.name);
    form.append("category", req.body.category_id); 
    form.append("description", req.body.description || "");
    form.append("price", req.body.price);
    form.append("stock", req.body.stock || 0);
    form.append("brand", req.body.brand || "");
    
    form.append("tag", req.body.tag || "");

    if (req.file) {
      form.append("image", req.file.buffer, {
        filename: req.file.originalname,
        contentType: req.file.mimetype,
      });
    } else if (req.body.image_url) {
      form.append("image_url", req.body.image_url);
    }

    const response = await axios.post(BASE_URL, form, {
      headers: { ...form.getHeaders(), ...NGROK_HEADERS },
    });
    res.status(201).json(response.data);
  } catch (error) {
    console.error("LỖI CREATE DJANGO:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json(error.response?.data || { message: "Internal Server Error" });
  }
};


export const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const form = new FormData();
    form.append("name", req.body.name);
    form.append("category", req.body.category_id);
    form.append("price", req.body.price);
    form.append("stock", req.body.stock);
    form.append("description", req.body.description || "");
    form.append("brand", req.body.brand || "");
    
    form.append("tag", req.body.tag || "");

    if (req.file) {
      form.append("image", req.file.buffer, {
        filename: req.file.originalname,
        contentType: req.file.mimetype,
      });
    } else if (req.body.image_url) {
      form.append("image_url", req.body.image_url);
    }


    const response = await axios.patch(`${BASE_URL}${id}/`, form, {
      headers: { ...form.getHeaders(), ...NGROK_HEADERS },
    });
    res.json(new Product(response.data));
  } catch (error) {
    console.error("LỖI UPDATE DJANGO:", error.response?.data || error.message); // Thêm log lỗi chi tiết
    res.status(error.response?.status || 500).json(error.response?.data || { message: "Error updating product" });
  }
};

// 5. Xóa sản phẩm
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await axios.delete(`${BASE_URL}${id}/`, { headers: NGROK_HEADERS });
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
};


export const getCategories = async (req, res) => {
  try {
    const response = await axios.get(CAT_URL, { headers: NGROK_HEADERS });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Cannot fetch categories" });
  }
};