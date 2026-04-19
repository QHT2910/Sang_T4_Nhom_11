import React, { useState } from "react";
import { Search, Package, Truck, CheckCircle, Clock } from "lucide-react";

function Tracking() {
  const [orderId, setOrderId] = useState("");
  const [orderStatus, setOrderStatus] = useState(null);

  const handleTrack = (e) => {
    e.preventDefault();
    if (orderId.trim()) {
      setOrderStatus({
        id: orderId,
        customer: "Khách hàng",
        status: "shipping", 
        items: [{ name: "Sản phẩm Demo", price: 1500000, quantity: 1 }],
        date: "20/04/2026"
      });
    }
  };

  const steps = [
    { label: "Đã đặt hàng", key: "pending", icon: <Clock size={20} /> },
    { label: "Đang xử lý", key: "processing", icon: <Package size={20} /> },
    { label: "Đang giao hàng", key: "shipping", icon: <Truck size={20} /> },
    { label: "Hoàn tất", key: "delivered", icon: <CheckCircle size={20} /> },
  ];

  return (
    <div className="max-w-[800px] mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Theo dõi đơn hàng</h1>
        <p className="text-gray-500">Nhập mã vận đơn của bạn</p>
      </div>

      <form onSubmit={handleTrack} className="flex gap-2 mb-12">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Nhập mã đơn hàng..."
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />
        </div>
        <button type="submit" className="bg-[#e30019] text-white px-8 py-4 rounded-xl font-bold hover:bg-red-700 transition-all">
          Kiểm tra
        </button>
      </form>

      {orderStatus && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gray-50 p-6 flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-800">Đơn hàng #{orderStatus.id}</h3>
            <p className="text-sm font-medium text-gray-500">Ngày đặt: {orderStatus.date}</p>
          </div>
          <div className="p-8">
            <div className="relative flex justify-between items-start mb-12">
              <div className="absolute top-5 left-0 w-full h-1 bg-gray-100 -z-0"></div>
              {steps.map((step, index) => {
                const isActive = steps.findIndex(s => s.key === orderStatus.status) >= index;
                return (
                  <div key={step.key} className="flex flex-col items-center relative z-10 w-1/4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isActive ? "bg-red-600 text-white shadow-lg" : "bg-white border-2 border-gray-200 text-gray-300"
                    }`}>
                      {step.icon}
                    </div>
                    <p className={`mt-3 text-[10px] md:text-sm font-bold text-center ${isActive ? "text-red-600" : "text-gray-400"}`}>
                      {step.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Tracking;