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
  chuaxuly: "bg-yellow-100 text-yellow-700 border-yellow-200",
  dangxuly: "bg-blue-100 text-blue-700 border-blue-200",
  danggiao: "bg-purple-100 text-purple-700 border-purple-200",
  Dagiao: "bg-green-100 text-green-700 border-green-200",
  dahuy: "bg-red-100 text-red-700 border-red-200",
};

const statusLabels = {
  chuaxuly: "Chưa xử lý",
  dangxuly: "Đang xử lý",
  danggiao: "Đang giao",
  Dagiao: "Đã giao",
  dahuy: "Đã hủy",
};

const ORDER_STATUSES = ["chuaxuly", "dangxuly", "danggiao", "Dagiao", "dahuy"];

const normalizeOrderStatus = (value) => {
  if (typeof value !== "string") return "chuaxuly";
  const trimmed = value.trim();
  return ORDER_STATUSES.includes(trimmed) ? trimmed : "chuaxuly";
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
      console.error("Loi khi tai don hang:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    if (filterStatus === "all") return true;
    return normalizeOrderStatus(order.status) === filterStatus;
  });

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await orderApi.updateOrderStatus(id, newStatus);
      alert("Cap nhat trang thai thanh cong!");
      fetchOrders();
    } catch (error) {
      console.error("Loi khi cap nhat trang thai:", error);
      alert(error?.response?.data?.status?.[0] || "Loi khi cap nhat trang thai");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Ban co chac chan muon xoa don hang nay?")) return;

    try {
      await orderApi.deleteOrder(id);
      alert("Da xoa don hang thanh cong!");
      if (getOrderId(selectedOrder) === id) {
        setSelectedOrder(null);
      }
      fetchOrders();
    } catch (error) {
      console.error("Loi khi xoa don hang:", error);
      alert(
        error?.response?.data?.message || "Loi khi thuc hien xoa don hang."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tight text-gray-800">
              Quản lý đơn hàng
            </h1>
            <p className="text-sm text-gray-500">
              Theo dõi và xử lý các đơn hàng
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
                <option value="chuaxuly">{statusLabels.chuaxuly}</option>
                <option value="dangxuly">{statusLabels.dangxuly}</option>
                <option value="danggiao">{statusLabels.danggiao}</option>
                <option value="Dagiao">{statusLabels.Dagiao}</option>
                <option value="dahuy">{statusLabels.dahuy}</option>
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
                  <th className="p-5">Mã đơn</th>
                  <th className="p-5">Khách hàng</th>
                  <th className="p-5">Ngày đặt</th>
                  <th className="p-5">Tổng tiền</th>
                  <th className="p-5 text-center">Trạng thái</th>
                  <th className="p-5 text-center">Thao tác</th>
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
                          {getOrderTotal(order).toLocaleString("vi-VN")} d
                        </p>
                      </td>
                      <td className="p-5">
                        <div className="flex justify-center">
                          <select
                            value={normalizeOrderStatus(order.status)}
                            onChange={(e) =>
                              handleUpdateStatus(getOrderId(order), e.target.value)
                            }
                            disabled={normalizeOrderStatus(order.status) === "dahuy"}
                            className={`cursor-pointer rounded-full border border-transparent px-3 py-1.5 text-[10px] font-black uppercase outline-none transition-all ${statusColors[normalizeOrderStatus(order.status)] || "bg-slate-100 text-slate-700 border-slate-200"}`}
                          >
                            <option value="chuaxuly">{statusLabels.chuaxuly}</option>
                            <option value="dangxuly">{statusLabels.dangxuly}</option>
                            <option value="danggiao">{statusLabels.danggiao}</option>
                            <option value="Dagiao">{statusLabels.Dagiao}</option>
                            <option value="dahuy">{statusLabels.dahuy}</option>
                          </select>
                        </div>
                      </td>
                      <td className="p-5 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="rounded-lg p-2 text-blue-500 transition-colors hover:bg-blue-50"
                            title="Xem chi tiet"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(getOrderId(order))}
                            className="rounded-lg p-2 text-red-400 transition-colors hover:bg-red-50"
                            title="Xoa don"
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
                      Không tìm thấy đơn hàng phù hợp.
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
                  Chi tiết đơn hàng #{getOrderId(selectedOrder)}
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
                    Người đặt
                  </p>
                  <p className="font-bold text-gray-800">
                    {getOrderCustomerName(selectedOrder)}
                  </p>
                  <p className="text-gray-500">{getOrderPhone(selectedOrder)}</p>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                  <p className="mb-1 text-[10px] font-bold uppercase text-gray-400">
                    Ngày đặt
                  </p>
                  <p className="font-medium text-gray-700">
                    {formatOrderDate(getOrderDate(selectedOrder))}
                  </p>
                </div>
                <div className="col-span-2 rounded-2xl border border-gray-100 bg-gray-50 p-4">
                  <p className="mb-1 text-[10px] font-bold uppercase text-gray-400">
                    Địa chỉ giao hàng
                  </p>
                  <p className="font-medium leading-tight text-gray-700">
                    {selectedOrder.address || "--"}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-black uppercase tracking-widest text-gray-400">
                  Chi tiết sản phẩm
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
                          {item.name || item.product_name || item.product || "San pham"}
                        </p>
                        <p className="text-xs font-medium text-gray-400">
                          So Luong: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-black text-gray-900">
                        {(
                          Number(item.price || 0) * Number(item.quantity || 0)
                        ).toLocaleString("vi-VN")}{" "}
                        d
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
                Tổng thanh toán
              </div>
              <div className="text-2xl font-black text-red-600">
                {getOrderTotal(selectedOrder).toLocaleString("vi-VN")} d
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminOrder;
