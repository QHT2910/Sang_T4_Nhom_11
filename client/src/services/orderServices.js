import api from "./api.js";

const orderApi = {
    getUserOrders: () => api.get("/user/order"),

    getOrders: () => api.get("/order"),

    getOrderById: (id) => api.get(`/order/${id}`),

    createOrder: (data) => api.post("/order", data),

    updateOrderStatus: (id, payload) =>
      api.patch(
        `/order/${id}/update_status`,
        typeof payload === "string" ? { status: payload } : payload
      ),

    deleteOrder: (id) => api.delete(`/order/${id}`),
}

export default orderApi;
