import React, { useState } from "react";
import { Link } from "react-router-dom";

export function ThanhToan() {
  // --- MOCK DATA (Dữ liệu giỏ hàng giả lập) ---
  const [cartItems] = useState([
    {
      id: 1,
      name: "Laptop Gaming ASUS ROG Strix G15 (2024)",
      price: 25990000,
      quantity: 1,
      image: "https://via.placeholder.com/100x100/1e3a8a/ffffff?text=ASUS",
      config: "Core i7 - 16GB RAM",
    },
    {
      id: 2,
      name: "Chuột Gaming Logitech G502 Hero",
      price: 1250000,
      quantity: 1,
      image: "https://via.placeholder.com/100x100/333/ffffff?text=Mouse",
      config: "Black",
    },
  ]);

  // --- STATE QUẢN LÝ FORM ---
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    province: "",
    note: "",
    paymentMethod: "cod", // Mặc định là Thanh toán khi nhận hàng
  });

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shippingFee = 30000;
  const total = subtotal + shippingFee;

  // Link tạo mã VietQR tự động theo số tiền đơn hàng (Bạn có thể sửa lại STK của bạn)
  const qrUrl = `https://img.vietqr.io/image/mbbank-123456789-print.png?amount=${total}&addInfo=Thanh toan don hang&accountName=NGUYEN THAI BAO`;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    console.log("Dữ liệu đơn hàng:", { ...formData, items: cartItems, total });
    alert("Cảm ơn Thái Bảo! Đơn hàng của bạn đã được ghi nhận hệ thống.");
    // Tại đây bạn sẽ gọi API để lưu đơn hàng vào Database
  };

  return (
    <div className="bg-[#f8f9fa] min-h-screen py-8 relative">
      <div className="container mx-auto px-4 max-w-[1100px]">
        {/* Tiêu đề trang */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <i className="fa-solid fa-cart-shopping text-blue-600"></i>
            Thanh toán đơn hàng
          </h1>
        </div>

        <form
          onSubmit={handleSubmitOrder}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* === CỘT TRÁI: THÔNG TIN GIAO HÀNG (7 CỘT) === */}
          <div className="lg:col-span-7 space-y-6">
            {/* Khối Thông tin cá nhân */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold mb-5 flex items-center gap-2 border-b pb-3">
                <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">
                  1
                </span>
                Thông tin người nhận
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Nhập đầy đủ họ tên"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Ví dụ: 0912xxxxxx"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email (Không bắt buộc)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="ten@gmail.com"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Địa chỉ nhận hàng *
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Số nhà, tên đường, phường/xã..."
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ghi chú đơn hàng
                  </label>
                  <textarea
                    name="note"
                    rows="3"
                    value={formData.note}
                    onChange={handleInputChange}
                    placeholder="Ví dụ: Giao giờ hành chính, gọi trước khi đến..."
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Khối Phương thức thanh toán */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold mb-5 flex items-center gap-2 border-b pb-3">
                <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">
                  2
                </span>
                Phương thức thanh toán
              </h2>

              <div className="space-y-4">
                {/* Lựa chọn 1: COD */}
                <label
                  className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${formData.paymentMethod === "cod" ? "border-blue-600 bg-blue-50" : "hover:bg-gray-50"}`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === "cod"}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div>
                      <p className="font-bold text-gray-800">
                        Thanh toán khi nhận hàng (COD)
                      </p>
                      <p className="text-xs text-gray-500">
                        Bạn chỉ thanh toán khi đã nhận được hàng.
                      </p>
                    </div>
                  </div>
                  <i className="fa-solid fa-money-bill-1-wave text-green-600 text-xl"></i>
                </label>

                {/* Lựa chọn 2: Chuyển khoản (Có kèm hộp QR) */}
                <div
                  className={`border rounded-xl transition-all overflow-hidden ${formData.paymentMethod === "bank" ? "border-blue-600 bg-blue-50" : "hover:bg-gray-50"}`}
                >
                  {/* Dòng label để click chọn */}
                  <label className="flex items-center justify-between p-4 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank"
                        checked={formData.paymentMethod === "bank"}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600"
                      />
                      <div>
                        <p className="font-bold text-gray-800">
                          Chuyển khoản ngân hàng
                        </p>
                        <p className="text-xs text-gray-500">
                          Mở ứng dụng ngân hàng và quét mã QR.
                        </p>
                      </div>
                    </div>
                    <i className="fa-solid fa-qrcode text-blue-600 text-xl"></i>
                  </label>

                  {/* HIỂN THỊ MÃ QR - CHỈ HIỆN KHI ĐÃ CHỌN BANK */}
                  {formData.paymentMethod === "bank" && (
                    <div className="p-5 border-t border-blue-200 bg-white m-2 rounded-lg flex flex-col items-center animate-fadeIn">
                      <p className="text-sm font-bold text-gray-800 mb-3">
                        Quét mã QR để thanh toán
                      </p>

                      {/* Ảnh QR Code */}
                      <div className="p-2 border border-gray-200 rounded-xl mb-3 bg-white">
                        <img
                          src={qrUrl}
                          alt="QR Code"
                          className="w-48 h-48 object-contain"
                        />
                      </div>

                      {/* Thông tin số tài khoản */}
                      <div className="text-center text-sm text-gray-700 bg-gray-50 p-4 rounded-lg w-full max-w-sm">
                        <div className="flex justify-between mb-2 border-b pb-1">
                          <span>Ngân hàng:</span>
                          <span className="font-bold">MB Bank</span>
                        </div>
                        <div className="flex justify-between mb-2 border-b pb-1">
                          <span>Chủ tài khoản:</span>
                          <span className="font-bold">NGUYEN THAI BAO</span>
                        </div>
                        <div className="flex justify-between mb-2 border-b pb-1">
                          <span>Số tài khoản:</span>
                          <span className="font-bold text-blue-600">
                            123456789
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Số tiền:</span>
                          <span className="font-bold text-red-600">
                            {total.toLocaleString()} ₫
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-red-500 mt-3 italic">
                        * Vui lòng không thay đổi nội dung chuyển khoản mặc định
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* === CỘT PHẢI: TÓM TẮT ĐƠN HÀNG (5 CỘT) === */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden sticky top-6">
              <div className="p-5 border-b bg-gray-50">
                <h2 className="font-bold text-gray-800">Đơn hàng của bạn</h2>
              </div>

              {/* Danh sách sản phẩm trong giỏ */}
              <div className="p-5 max-h-[400px] overflow-y-auto space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain p-1"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-gray-800 truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500 mb-1">
                        Cấu hình: {item.config}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                          SL: {item.quantity}
                        </span>
                        <span className="text-sm font-bold text-blue-600">
                          {Number(item.price).toLocaleString()} ₫
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tính toán tiền */}
              <div className="p-5 bg-gray-50 border-t space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tạm tính:</span>
                  <span className="font-medium text-gray-900">
                    {subtotal.toLocaleString()} ₫
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Phí vận chuyển:</span>
                  <span className="font-medium text-gray-900">
                    {shippingFee.toLocaleString()} ₫
                  </span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                  <span className="font-bold text-gray-800">Tổng cộng:</span>
                  <span className="text-2xl font-black text-red-600">
                    {total.toLocaleString()} ₫
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 italic text-right">
                  (Đã bao gồm thuế VAT nếu có)
                </p>
              </div>

              {/* Nút đặt hàng */}
              <div className="p-5 pt-0">
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white font-bold py-4 rounded-xl hover:bg-red-700 shadow-lg shadow-red-200 transition-all active:scale-[0.98] uppercase tracking-wide"
                >
                  Xác nhận đặt hàng
                </button>
                <Link
                  to="/product"
                  className="block text-center mt-4 text-sm text-gray-500 hover:text-blue-600 transition-colors"
                >
                  <i className="fa-solid fa-arrow-left mr-2"></i> Tiếp tục mua
                  sắm
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Thêm CSS cho hiệu ứng mượt mà (có thể dời qua file css) */}
      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default ThanhToan;
