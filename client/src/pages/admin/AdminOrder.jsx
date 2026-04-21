import React, { useState, useEffect } from "react";
import orderApi from "../../services/orderServices";
import { Trash2, Eye, RefreshCw, Filter, X, ShoppingCart } from "lucide-react";

function AdminOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null); // Để hiện Modal chi tiết

  // 1. Lấy danh sách đơn hàng từ Server
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await orderApi.getOrders();
      // Lọc bỏ các đơn đã bị xóa mềm (trạng thái deleted hoặc flag is_deleted)
      const activeOrders = (res.data || []).filter(
        (order) => order.status !== "deleted" && !order.is_deleted
      );
      setOrders(activeOrders);
    } catch (err) {
      console.error("Lỗi khi tải đơn hàng:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 2. Logic lọc dữ liệu dựa trên filterStatus (Sửa lỗi ESLint)
  const filteredOrders = orders.filter((order) => {
    if (filterStatus === "all") return true;
    return order.status === filterStatus;
  });

  // 3. Cập nhật trạng thái đơn hàng
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await orderApi.updateOrderStatus(id, newStatus);
      alert("Cập nhật trạng thái thành công!");
      fetchOrders();
    } catch (error) {
        console.error("Lỗi khi cập nhật trạng thái:", error);
      alert("Lỗi khi cập nhật trạng thái");
    }
  };

  // 4. Xóa mềm (Soft Delete)
  const handleSoftDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này?")) {
      try {
        await orderApi.updateOrderStatus(id, "deleted");
        alert("Đã xóa đơn hàng thành công!");
        fetchOrders();
      } catch (error) {
        console.error("Lỗi khi xóa đơn hàng:", error);
        alert("Lỗi khi thực hiện xóa");
      }
    }
  };

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    processing: "bg-blue-100 text-blue-700 border-blue-200",
    shipping: "bg-purple-100 text-purple-700 border-purple-200",
    delivered: "bg-green-100 text-green-700 border-green-200",
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-black text-gray-800 uppercase tracking-tight">Quản lý đơn hàng</h1>
            <p className="text-sm text-gray-500">Theo dõi và xử lý các giao dịch trên hệ thống</p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-red-500 bg-white text-sm font-bold transition-all shadow-sm"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="pending">Chờ xử lý</option>
                <option value="processing">Đang đóng gói</option>
                <option value="shipping">Đang giao</option>
                <option value="delivered">Đã giao</option>
              </select>
            </div>

            <button
              onClick={fetchOrders}
              className="p-2.5 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-all shadow-sm group"
            >
              <RefreshCw size={18} className={`${loading ? "animate-spin" : ""} text-gray-600 group-hover:text-red-600`} />
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100 text-[10px] uppercase tracking-widest text-gray-400 font-black">
                  <th className="p-5">Mã Đơn</th>
                  <th className="p-5">Khách Hàng</th>
                  <th className="p-5">Ngày Đặt</th>
                  <th className="p-5">Tổng Tiền</th>
                  <th className="p-5 text-center">Trạng Thái</th>
                  <th className="p-5 text-center">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50/30 transition-colors group">
                      <td className="p-5 font-mono font-bold text-red-600 text-sm">#{order.id}</td>
                      <td className="p-5">
                        <div className="text-sm font-bold text-gray-800">{order.full_name || order.fullName || "Ẩn danh"}</div>
                        <div className="text-[10px] text-gray-400 font-medium">{order.phone}</div>
                      </td>
                      <td className="p-5 text-xs text-gray-500 font-medium">
                        {new Date(order.created_at || order.date).toLocaleDateString("vi-VN")}
                      </td>
                      <td className="p-5 font-black text-gray-900 text-sm">
                        // Thay đổi dòng hiển thị tổng tiền
<p className="text-2xl font-black text-red-600">
  {Number(order.total || order.total_amount || order.total_price).toLocaleString()} ₫
</p>
                      </td>
                      <td className="p-5">
                        <div className="flex justify-center">
                          <select
                            value={order.status}
                            onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                            className={`text-[10px] uppercase font-black px-3 py-1.5 rounded-full border border-transparent outline-none cursor-pointer transition-all shadow-sm ${statusColors[order.status]}`}
                          >
                            <option value="pending">Chờ xử lý</option>
                            <option value="processing">Đang chuẩn bị</option>
                            <option value="shipping">Đang giao</option>
                            <option value="delivered">Đã giao</option>
                          </select>
                        </div>
                      </td>
                      <td className="p-5 text-center">
                        <div className="flex justify-center gap-2">
                          <button 
                            onClick={() => setSelectedOrder(order)}
                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" 
                            title="Xem chi tiết"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => handleSoftDelete(order.id)}
                            className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                            title="Xóa mềm"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="p-20 text-center text-gray-400 italic text-sm">
                      Không tìm thấy đơn hàng nào phù hợp.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL CHI TIẾT ĐƠN HÀNG (Bổ sung mới) */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in duration-300">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50/50">
              <div className="flex items-center gap-2">
                <ShoppingCart className="text-red-600" size={20} />
                <h2 className="font-black text-gray-800 uppercase tracking-tight">Chi tiết đơn hàng #{selectedOrder.id}</h2>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
              {/* Thông tin khách hàng */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Người nhận</p>
                  <p className="font-bold text-gray-800">{selectedOrder.full_name || selectedOrder.fullName}</p>
                  <p className="text-gray-500">{selectedOrder.phone}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Địa chỉ giao hàng</p>
                  <p className="font-medium text-gray-700 leading-tight">{selectedOrder.address}</p>
                </div>
              </div>

              {/* Danh sách sản phẩm */}
              <div className="space-y-3">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Sản phẩm đã đặt</p>
                {selectedOrder.items?.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 bg-white border border-gray-100 rounded-2xl hover:border-red-200 transition-colors">
                    <img src={item.image} className="w-14 h-14 object-contain bg-gray-50 rounded-xl p-1 border" alt="" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-800 truncate">{item.name}</p>
                      <p className="text-xs text-gray-400 font-medium">Số lượng: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-black text-gray-900">{(item.price * item.quantity).toLocaleString()} ₫</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-gray-50 border-t flex justify-between items-center">
              <div className="text-xs font-bold text-gray-500 uppercase">Tổng thanh toán</div>
              <div className="text-2xl font-black text-red-600">{Number(selectedOrder.total_price).toLocaleString()} ₫</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminOrder;