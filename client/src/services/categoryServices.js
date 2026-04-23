import api from "./api";


const CategoryApi = {
  getCategories: () => api.get("/categories/"),
  getCategoryById: (id) => api.get(`/categories/${id}/`),
  createCategory: (data) => api.post("/categories/", data),
};

export default CategoryApi;