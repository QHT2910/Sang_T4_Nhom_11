import axios from "axios";
import Product from "../models/productModel.js";

export const getProducts = async (req, res) => {
  try {

    const response = await axios.get(
      "https://plumiest-procivic-jules.ngrok-free.dev/api/products/"
    );

    const products = response.data.map((p) => new Product(p));

    res.json(products);

  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(
      `https://plumiest-procivic-jules.ngrok-free.dev/api/products/${id}/`
    );
    const product = new Product(response.data);
    res.json(product);
  }
  catch (error) {
    res.status(500).json({ message: "Error fetching product" });
  }
};
export const updateProduct = async(req,res)=>{ 
  const { id } = req.params;
  try {
    const response = await axios.patch(
      `https://plumiest-procivic-jules.ngrok-free.dev/api/products/${id}/`,
      req.body
    );
    const product = new Product(response.data);
    res.json(product);
  }
  catch (error) {
    res.status(500).json({ message: "Error updating product" });
  } 
}
export const createProduct = async(req,res)=>{
  try {
    const response = await axios.post(
      `https://plumiest-procivic-jules.ngrok-free.dev/api/products/`,
      req.body
    );  
    const product = new Product(response.data);
    res.status(201).json(product);
  }
  catch (error) {
    res.status(500).json({ message: "Error creating product" });
  }
}
export const deleteProduct = async(req,res)=>{
  const { id } = req.params;
  try {
    await axios.delete(
      `https://plumiest-procivic-jules.ngrok-free.dev/api/products/${id}/`
    );
    res.json({ message: "Product deleted" });
  } 
  catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
}
export const searchProducts = async(req,res)=>{
  const { query } = req.query;
  try {
    const response = await axios.get(
      `https://plumiest-procivic-jules.ngrok-free.dev/api/products/?search=${query}`
    );
    const products = response.data.map((p) => new Product(p));
    res.json(products);
  }
  catch (error) {
    res.status(500).json({ message: "Error searching products" });
  }
}