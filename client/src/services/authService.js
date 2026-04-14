
import api from "./api.js";
export const ApiLogin = {
  Login: (data) => api.post("/login", data),
  Register: (data) => api.post("/register", data)
}
export default ApiLogin;