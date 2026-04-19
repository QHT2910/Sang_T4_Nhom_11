import axios from "axios";
import Product from "../models/productModel.js";
import FormData from "form-data";
import { connectDB } from "../config/db.js";
// XÓA Content-Type ở đây vì nó sẽ thay đổi tùy theo loại request
// const NGROK_HEADERS = {
//   "ngrok-skip-browser-warning": "true",
// };

// const BASE_URL = "https://plumiest-procivic-jules.ngrok-free.dev/api/products/";

export const getProducts = async (req, res) => {
  try {
    // // C1: Lấy dữ liệu trực tiếp từ Django qua API
    // const response = await axios.get(BASE_URL, { 
    //   headers: { ...NGROK_HEADERS, "Content-Type": "application/json" } 
    // });
    // const apiProducts = response.data.map((p) => new Product(p));

    // C2: Lấy dữ liệu từ MySQL (nếu cần đồng bộ hoặc lưu trữ cục bộ)
    const db = await connectDB();
    const [rows] = await db.execute("SELECT * FROM product");
    const dbProducts = rows.map((p) => new Product(p));
    res.json(dbProducts);


  } catch (error) {
    console.error("Error fetching products:", error);
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
    // Nếu có file upload từ multer
    const imageUrl = req.file ? `/upload/${req.file.filename}` : null;

    const db = await connectDB();
    await db.execute(
      "INSERT INTO product (name, description, price, stock, brand, sold, tag, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        req.body.name,
        req.body.description || "",
        req.body.price,
        req.body.stock || 0,
        req.body.brand,
        req.body.sold || 0,
        req.body.tag || "",
        imageUrl
      ]
    );

    res.status(201).json({
      message: "Product created successfully",
      product: {
        name: req.body.name,
        description: req.body.description || "",
        price: req.body.price,
        stock: req.body.stock || 0,
        brand: req.body.brand,
        sold: req.body.sold || 0,
        tag: req.body.tag || "",
        image: imageUrl
      }
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Error creating product" });
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