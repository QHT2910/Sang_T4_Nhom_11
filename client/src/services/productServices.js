import api from "./api.js";

export const getProducts = () => {
  return api.get("/products/");
};