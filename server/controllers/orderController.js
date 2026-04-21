import axios from "axios";

const API_URL = "https://plumiest-procivic-jules.ngrok-free.dev/api/order/";

const api = axios.create({
  baseURL: API_URL,
  headers: { "ngrok-skip-browser-warning": "true" },
});

const getAuthHeaders = (req) => ({
  headers: {
    "ngrok-skip-browser-warning": "true",
    Authorization: req.headers.authorization,
  },
});


export const createOrder = async (req, res) => {
  try {
    const { total_price, email, phone, address, note, payment_method, items, user } = req.body;
    const userId = req.user?.id || req.user?.user_id;
    const authHeader = req.headers.authorization;

    console.log("[createOrder] auth header present:", Boolean(authHeader));
    console.log("[createOrder] req.user:", req.user);

    if (!authHeader) {
      return res.status(401).json({ message: "Khong tim thay token" });
    }

    if (!userId) {
      return res.status(401).json({ message: "Khong xac dinh duoc user id tu token" });
    }

    const parsedTotal = Number(total_price);
    if (!Number.isFinite(parsedTotal)) {
      return res.status(400).json({ message: "Tong tien khong hop le" });
    }

    const dataForDjango = {
      user_id: userId,
      user: user || {
        user_id: userId,
        username: req.user?.username || "",
        is_staff: req.user?.role === "admin" || req.user?.role === "superadmin",
        is_superuser: req.user?.role === "superadmin",
        is_active: true,
      },
      order_items: Array.isArray(items)
        ? items.map((item) => ({
            product: item.product ?? item.id,
            quantity: item.quantity || 1,
            price: item.price,
            order: item.order ?? 0,
          }))
        : [],
      total: parsedTotal.toFixed(2),
      status: false,
      email,
      phone,
      address,
      note: note || "",
      paymentMethod: payment_method,
    };

    console.log("[createOrder] payload user_id:", dataForDjango.user_id);
    console.log("[createOrder] payload user:", dataForDjango.user);
    console.log("[createOrder] payload order_items:", dataForDjango.order_items);

    const response = await api.post("/", dataForDjango, getAuthHeaders(req));
    return res.status(201).json(response.data);
  } catch (error) {
    const contentType = error.response?.headers?.["content-type"] || "";
    const responseData = error.response?.data;

    if (contentType.includes("text/html")) {
      const djangoMessage =
        extractDjangoDebugMessage(responseData) ||
        "Django upstream returned an HTML error page";

      console.error("Django HTML error:", djangoMessage);

      return res.status(error.response?.status || 502).json({
        message: "Django upstream error",
        error: djangoMessage,
      });
    }

    console.error("Loi khi tao don hang:", responseData || error.message);
    return res.status(error.response?.status || 500).json({
      message:
        responseData?.message ||
        responseData?.error ||
        "Loi ket noi server",
      error: responseData || error.message,
    });
  }
};

export const getOrders = async (req, res) => {
  try {
    const response = await api.get("", getAuthHeaders(req));
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Loi tai don hang" });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const response = await api.get("", getAuthHeaders(req));
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Loi tai lich su don hang" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const response = await api.patch(
      `${req.params.id}/update_status/`,
      req.body,
      getAuthHeaders(req)
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json(error.response?.data);
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const response = await api.delete(`${req.params.id}/`, getAuthHeaders(req));
    res.json({ message: "Da xoa don hang", data: response.data });
  } catch (error) {
    res.status(500).json({ message: "Loi khi xoa" });
  }
};
