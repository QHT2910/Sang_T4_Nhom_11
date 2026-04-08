
import api from "./api.js";
export const ApiLogin = {
  Login: (data) => api.post("/auth/login/", data),
  Register: (data) => api.post("/auth/register/", data)
}
export default ApiLogin;