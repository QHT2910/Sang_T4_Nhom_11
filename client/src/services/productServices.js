import api from "./api.js";

const productApi = {
  getProducts: () => api.get("/products/"),
  getProductById: (id) => api.get(`/products/${id}/`),
  createProduct: (data) =>
    api.post("/products/", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  updateProduct: (id, data) =>
    api.patch(`/products/${id}/`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  deleteProduct: (id) => api.delete(`/products/${id}/`),
  getCategories: () => api.get("/categories/"),
  
}
export default productApi;
