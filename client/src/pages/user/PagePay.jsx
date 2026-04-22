import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import orderApi from "../../services/orderServices";

const fullNameRegex = /^[\p{L}\s]+$/u;
const phoneRegex = /^\d+$/;

function ThanhToan() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [formData, setFormData] = useState({
    fullName: "",
    email: user.email || "",
    phone: "",
    address: "",
    note: "",
    paymentMethod: "cash",
  });

  const SHIPPING_COST = 30000;
  const subtotal = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * (item.quantity || 1),
    0
  );
  const shippingFee = cartItems.length > 0 ? SHIPPING_COST : 0;
  const total = subtotal + shippingFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const normalizedValue =
      name === "phone" ? value.replace(/\D/g, "") : value;

    setFormError("");
    setFormData({ ...formData, [name]: normalizedValue });
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setFormError("");

    if (cartItems.length === 0) {
      return alert("Gio hang trong!");
    }

    const trimmedFullName = formData.fullName.trim();
    const trimmedPhone = formData.phone.trim();

    if (!trimmedFullName || !trimmedPhone) {
      setFormError("Ho ten va so dien thoai khong duoc de trong.");
      return;
    }

    if (!fullNameRegex.test(trimmedFullName)) {
      setFormError("Ho ten khong duoc chua ky tu dac biet.");
      return;
    }

    if (!phoneRegex.test(trimmedPhone)) {
      setFormError("Số điện thoại chỉ được nhập số.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Vui lòng đăng nhập trước khi đặt hàng.");
      navigate("/login");
      return;
    }

    setIsSubmitting(true);
    console.log("[PagePay] token present:", Boolean(token));

    const orderData = {
      user,
      email: formData.email,
      phone: trimmedPhone,
      address: formData.address,
      note: formData.note.trim() || "N/A",
      payment_method: formData.paymentMethod,
      total_price: Number(total),
      items: cartItems.map((item) => ({
        product: item.id,
        quantity: item.quantity || 1,
        price: item.price,
        order: 0,
      })),
    };

    try {
      const response = await orderApi.createOrder(orderData);
      alert("Dat hang thanh cong!");

      setCartItems([]);
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("cartChange"));
      window.dispatchEvent(new Event("orderChange"));

      const newOrderId = response.data?.order_id || response.data?.id || "";
      navigate(`/tracking${newOrderId ? `?orderId=${newOrderId}` : ""}`);
    } catch (error) {
      const detail = error.response?.data?.detail || error.response?.data;
      console.log(
        "ORDER ERROR RESPONSE:",
        JSON.stringify(error.response?.data, null, 2)
      );
      console.log("ORDER ERROR STATUS:", error.response?.status);

      alert(
        "Lỗi đặt hàng: " +
          (detail?.message ||
            detail?.error ||
            error.response?.data?.message ||
            "Vui long thu lai sau.")
      );
      console.log("PAYMENT METHOD GUI:", formData.paymentMethod);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#f8f9fa] min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-[1100px]">
        <h1 className="text-2xl font-bold text-gray-800 mb-8 uppercase tracking-tight text-center">
          Thanh toan don hang
        </h1>

        <form
          onSubmit={handleSubmitOrder}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {formError && (
            <div className="lg:col-span-12 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
              {formError}
            </div>
          )}

          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold mb-6 border-b pb-3 text-red-600 uppercase">
                1. Thong tin nguoi nhan
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-xs font-black text-gray-400 uppercase mb-1">
                    Ho va ten *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    className="w-full px-4 py-3 border rounded-xl bg-gray-50"
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase mb-1">
                    So dien thoai *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    inputMode="numeric"
                    pattern="[0-9]+"
                    value={formData.phone}
                    className="w-full px-4 py-3 border rounded-xl bg-gray-50"
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    className="w-full px-4 py-3 border rounded-xl bg-gray-50"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-black text-gray-400 uppercase mb-1">
                    Địa Chỉ *
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    className="w-full px-4 py-3 border rounded-xl bg-gray-50"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-black text-gray-400 uppercase mb-1">
                    Ghi chu (tuy chon)
                  </label>
                  <textarea
                    name="note"
                    rows="3"
                    value={formData.note}
                    className="w-full px-4 py-3 border rounded-xl bg-gray-50"
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold mb-6 border-b pb-3 text-red-600 uppercase">
                2. Phuong thuc thanh toan
              </h2>

              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
              >
                <option value="cash">Cash</option>
                <option value="qr">QR</option>
              </select>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl shadow-xl border p-6 sticky top-6">
              <h3 className="font-black uppercase text-sm mb-4 border-b pb-2">
                Tom tat don hang
              </h3>

              <div className="space-y-3 border-b pb-4 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Tien hang:</span>
                  <span>{subtotal.toLocaleString()} VND</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Phí giao hàng:</span>
                  <span>{shippingFee.toLocaleString()} VND</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="font-bold">TONG CONG:</span>
                <span className="text-2xl font-black text-red-600">
                  {total.toLocaleString()} VND
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-red-700 transition-all"
              >
                  {isSubmitting ? "Đang xử lý..." : "Xác nhận đặt hàng"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ThanhToan;
