import api from "./api.js";

const orderApi = {
    // 1. Lấy đơn hàng của chính người dùng (Dùng trong Tracking.jsx)
    getUserOrders: () => api.get("/user/order"),

    // 2. Lấy toàn bộ danh sách đơn hàng (Dùng trong AdminOrder.jsx)
    getOrders: () => api.get("/order"),

    // 3. Xem chi tiết 1 đơn hàng cụ thể
    getOrderById: (id) => api.get(`/order/${id}`),

    // 4. Tạo đơn hàng mới (Dùng trong PagePay.jsx)
    createOrder: (data) => api.post("/order", data),

    // 5. Cập nhật trạng thái (Dùng trong AdminOrder.jsx)
    updateOrderStatus: (id, status) => api.patch(`/order/${id}/update_status`, { status }),

    // 6. Xóa đơn hàng (Soft Delete - Cần thêm để AdminOrder.jsx hoạt động)
    deleteOrder: (id) => api.delete(`/order/${id}`),
}

export default orderApi;