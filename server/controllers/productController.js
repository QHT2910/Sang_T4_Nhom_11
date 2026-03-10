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
