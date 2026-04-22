import React, { useEffect, useState } from "react";
import {
  Eye,
  Filter,
  RefreshCw,
  ShoppingCart,
  Trash2,
  X,
} from "lucide-react";
import orderApi from "../../services/orderServices";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  processing: "bg-blue-100 text-blue-700 border-blue-200",
  shipping: "bg-purple-100 text-purple-700 border-purple-200",
  delivered: "bg-green-100 text-green-700 border-green-200",
  deleted: "bg-red-100 text-red-700 border-red-200",
};

const getOrderId = (order) => order?.id || order?.order_id || "";
const getOrderCustomerName = (order) =>
  order?.full_name ||
  order?.fullName ||
  order?.user?.username ||
  order?.user_name ||
  order?.customer_name ||
  "An danh";
const getOrderPhone = (order) => order?.phone || order?.user?.phone || "";
const getOrderDate = (order) =>
  order?.created_at || order?.order_date || order?.date || order?.createdAt || "";
const getOrderTotal = (order) =>
  Number(order?.total ?? order?.total_amount ?? order?.total_price ?? 0);
const getOrderItems = (order) => order?.items || order?.order_items || [];

function formatOrderDate(value) {
  if (!value) return "--";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "--" : date.toLocaleDateString("vi-VN");
}

function AdminOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await orderApi.getOrders();
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Lỗi khi tải đơn hàng:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    if (filterStatus === "all") return true;
    return order.status === filterStatus;
  });

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

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này?")) return;

    try {
      await orderApi.deleteOrder(id);
      alert("Đã xóa đơn hàng thành công!");
      if (getOrderId(selectedOrder) === id) {
        setSelectedOrder(null);
      }
      fetchOrders();
    } catch (error) {
      console.error("Lỗi khi xóa đơn hàng:", error);
      alert(
        error?.response?.data?.message || "Lỗi khi thực hiện xóa đơn hàng."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tight text-gray-800">
              Quản Lý Đơn Hàng
            </h1>
            <p className="text-sm text-gray-500">
              Theo dõi và xử lý các giao dịch trên hệ thống
            </p>
          </div>

          <div className="flex w-full items-center gap-3 md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <Filter
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="rounded-xl border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm font-bold outline-none transition-all focus:ring-2 focus:ring-red-500"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="pending">Chờ xử lý</option>
                <option value="processing">Đang chuẩn bị</option>
                <option value="shipping">Đang giao</option>
                <option value="delivered">Đã giao</option>
                <option value="deleted">Đã hủy</option>
              </select>
            </div>

            <button
              onClick={fetchOrders}
              className="group rounded-xl border border-gray-200 bg-white p-2.5 transition-all hover:bg-gray-50"
            >
              <RefreshCw
                size={18}
                className={`text-gray-600 group-hover:text-red-600 ${
                  loading ? "animate-spin" : ""
                }`}
              />
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl shadow-gray-200/50">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50 text-[10px] font-black uppercase tracking-widest text-gray-400">
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
                    <tr
                      key={getOrderId(order)}
                      className="group transition-colors hover:bg-gray-50/30"
                    >
                      <td className="p-5 font-mono text-sm font-bold text-red-600">
                        #{getOrderId(order)}
                      </td>
                      <td className="p-5">
                        <div className="text-sm font-bold text-gray-800">
                          {getOrderCustomerName(order)}
                        </div>
                        <div className="text-[10px] font-medium text-gray-400">
                          {getOrderPhone(order)}
                        </div>
                      </td>
                      <td className="p-5 text-xs font-medium text-gray-500">
                        {formatOrderDate(getOrderDate(order))}
                      </td>
                      <td className="p-5">
                        <p className="text-2xl font-black text-red-600">
                          {getOrderTotal(order).toLocaleString("vi-VN")} đ
                        </p>
                      </td>
                      <td className="p-5">
                        <div className="flex justify-center">
                          <select
                            value={order.status}
                            onChange={(e) =>
                              handleUpdateStatus(getOrderId(order), e.target.value)
                            }
                            disabled={order.status === "deleted"}
                            className={`cursor-pointer rounded-full border border-transparent px-3 py-1.5 text-[10px] font-black uppercase outline-none transition-all ${statusColors[order.status] || "bg-slate-100 text-slate-700 border-slate-200"}`}
                          >
                            <option value="pending">Chờ xử lý</option>
                            <option value="processing">Đang chuẩn bị</option>
                            <option value="shipping">Đang giao</option>
                            <option value="delivered">Đã giao</option>
                            <option value="deleted">Đã hủy</option>
                          </select>
                        </div>
                      </td>
                      <td className="p-5 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="rounded-lg p-2 text-blue-500 transition-colors hover:bg-blue-50"
                            title="Xem chi tiết"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(getOrderId(order))}
                            className="rounded-lg p-2 text-red-400 transition-colors hover:bg-red-50"
                            title="Xóa đơn"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="p-20 text-center text-sm italic text-gray-400"
                    >
                      Không tìm thấy đơn hàng nào phù hợp.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b bg-gray-50/50 p-6">
              <div className="flex items-center gap-2">
                <ShoppingCart className="text-red-600" size={20} />
                <h2 className="font-black uppercase tracking-tight text-gray-800">
                  Chi Tiết Đơn Hàng #{getOrderId(selectedOrder)}
                </h2>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-full p-2 transition-colors hover:bg-gray-200"
              >
                <X size={20} />
              </button>
            </div>

            <div className="max-h-[70vh] space-y-6 overflow-y-auto p-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                  <p className="mb-1 text-[10px] font-bold uppercase text-gray-400">
                    Người Đặt
                  </p>
                  <p className="font-bold text-gray-800">
                    {getOrderCustomerName(selectedOrder)}
                  </p>
                  <p className="text-gray-500">{getOrderPhone(selectedOrder)}</p>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                  <p className="mb-1 text-[10px] font-bold uppercase text-gray-400">
                    Ngày Đặt
                  </p>
                  <p className="font-medium text-gray-700">
                    {formatOrderDate(getOrderDate(selectedOrder))}
                  </p>
                </div>
                <div className="col-span-2 rounded-2xl border border-gray-100 bg-gray-50 p-4">
                  <p className="mb-1 text-[10px] font-bold uppercase text-gray-400">
                    Địa Chỉ Giao Hàng
                  </p>
                  <p className="font-medium leading-tight text-gray-700">
                    {selectedOrder.address || "--"}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-black uppercase tracking-widest text-gray-400">
                  Sản Phẩm Đã Đặt
                </p>
                {getOrderItems(selectedOrder).length > 0 ? (
                  getOrderItems(selectedOrder).map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-3 transition-colors hover:border-red-200"
                    >
                      <img
                        src={item.image || item.product_image}
                        className="h-14 w-14 rounded-xl border bg-gray-50 p-1 object-contain"
                        alt=""
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-gray-800">
                          {item.name || item.product_name || item.product || "Sản phẩm"}
                        </p>
                        <p className="text-xs font-medium text-gray-400">
                          Số Lượng: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-black text-gray-900">
                        {(
                          Number(item.price || 0) * Number(item.quantity || 0)
                        ).toLocaleString("vi-VN")}{" "}
                        đ
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-gray-200 p-5 text-sm text-gray-400">
                    Không có chi tiết sản phẩm.
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between border-t bg-gray-50 p-6">
              <div className="text-xs font-bold uppercase text-gray-500">
                Tổng Thanh Toán
              </div>
              <div className="text-2xl font-black text-red-600">
                {getOrderTotal(selectedOrder).toLocaleString("vi-VN")} đ
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminOrder;
