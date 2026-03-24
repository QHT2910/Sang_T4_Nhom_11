import api from "./api.js";

const userApi = {
  getUsers: () => api.get("/users/"),
  createUser: (data) => api.post("/users/", data),
  updateUser: (id, data) => api.put(`/users/${id}/`, data),
  deleteUser: (id) => api.delete(`/users/${id}/`),
}
export default userApi;