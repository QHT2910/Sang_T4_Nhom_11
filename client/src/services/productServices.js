import api from "./api.js";

const productApi = {
  getProducts: () => api.get("/products/"),
  getProductById: (id) => api.get(`/products/${id}/`),
  createProduct: (data) => api.post("/products/", data),
  updateProduct: (id, data) => api.patch(`/products/${id}/`, data),
  deleteProduct: (id) => api.delete(`/products/${id}/`),
}
export default productApi;