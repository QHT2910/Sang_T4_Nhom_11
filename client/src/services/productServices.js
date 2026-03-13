import api from "./api.js";

export const getProducts = () => {
  return api.get("/products/");
};

export const getProductById = (id) => {
  return api.get(`/products/${id}/`);
};
