import React, { useEffect, useState } from "react";
import orderApi from "../../services/orderServices";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  ShoppingBag,
  ChevronDown,
  ChevronUp,
  XCircle,
  MapPin,
  Calendar,
  X,
} from "lucide-react";

const ORDER_STATUSES = ["chuaxuly", "dangxuly", "danggiao", "Dagiao", "dahuy"];

const getOrderId = (order) => order.order_id || order.id;
const getOrderDate = (order) => order.order_date || order.created_at;
const getOrderItems = (order) => order.order_items || order.items || [];
const getOrderTotal = (order) =>
  Number(order.total || order.total_amount || order.total_price || 0);
const getOrderStatus = (order) => {
  if (typeof order.status === "string") return order.status;
  return order.status ? "Dagiao" : "chuaxuly";
};

function Tracking() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [cancelOrder, setCancelOrder] = useState(null);
  const [cancelReason, setCancelReason] = useState("");
  const [isCancelling, setIsCancelling] = useState(false);
  const currentUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "{}");
    } catch {
      return {};
    }
  })();

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await orderApi.getUserOrders();
      const visibleOrders = [...(res.data || [])].filter((order) => {
        const orderUserId =
          order?.user_id ||
          order?.user?.user_id ||
          order?.user?.id ||
          order?.user;
        const currentUserId = currentUser?.user_id || currentUser?.id;
        return String(orderUserId) === String(currentUserId);
      });
      const sortedOrders = visibleOrders.sort((a, b) => {
        const leftDate = new Date(getOrderDate(a) || 0).getTime();
        const rightDate = new Date(getOrderDate(b) || 0).getTime();
        return rightDate - leftDate;
      });
      setOrders(sortedOrders);
    } catch (err) {
      console.error("Loi tai don hang:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [currentUser?.id, currentUser?.user_id]);

  const statusConfig = {
    chuaxuly: {
      label: "Cho xu ly",
      color: "text-yellow-600 bg-yellow-50 border-yellow-100",
      icon: <Clock size={16} />,
    },
    dangxuly: {
      label: "Đang chuẩn bị",
      color: "text-blue-600 bg-blue-50 border-blue-100",
      icon: <Package size={16} />,
    },
    danggiao: {
      label: "Đang giao hàng",
      color: "text-purple-600 bg-purple-50 border-purple-100",
      icon: <Truck size={16} />,
    },
    Dagiao: {
      label: "Da hoan thanh",
      color: "text-green-600 bg-green-50 border-green-100",
      icon: <CheckCircle size={16} />,
    },
    dahuy: {
      label: "Da huy",
      color: "text-red-600 bg-red-50 border-red-100",
      icon: <XCircle size={16} />,
    },
  };

  const toggleExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const openCancelModal = (order) => {
    setCancelOrder(order);
    setCancelReason("");
  };

  const closeCancelModal = () => {
    if (isCancelling) return;
    setCancelOrder(null);
    setCancelReason("");
  };

  const handleCancelOrder = async () => {
    if (!cancelOrder) return;
    if (!cancelReason.trim()) {
      alert("Vui long nhap ly do huy don.");
      return;
    }

    setIsCancelling(true);
    try {
      await orderApi.updateOrderStatus(getOrderId(cancelOrder), {
        status: "dahuy",
        reason: cancelReason.trim(),
        cancel_reason: cancelReason.trim(),
      });
      closeCancelModal();
      await fetchOrders();
      alert("Da huy don hang.");
    } catch (error) {
      console.error("Loi khi huy don:", error);
      alert(
        error?.response?.data?.message ||
          error?.response?.data?.detail ||
          "Khong the huy don hang."
      );
    } finally {
      setIsCancelling(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-red-600"></div>
        <p className="mt-4 font-medium text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-4xl bg-gray-50 p-4 md:mx-auto md:p-8">
      <div className="mb-8">
        <h1 className="flex items-center gap-3 text-3xl font-black uppercase tracking-tighter text-gray-900">
          <ShoppingBag className="text-red-600" size={32} />
          Don hang cua toi
        </h1>
        <p className="mt-1 text-gray-500">theo doi tien do va lich su</p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-3xl border-2 border-dashed border-gray-200 bg-white py-20 text-center shadow-sm">
          <ShoppingBag size={64} className="mx-auto mb-4 text-gray-200" />
          <h3 className="text-xl font-bold text-gray-800">Chua co don hang</h3>
          <p className="mb-6 mt-2 text-gray-500">
            Chua thuc hien giao dich nao.
          </p>
          <a
            href="/product"
            className="inline-block rounded-xl bg-red-600 px-8 py-3 font-black uppercase tracking-wide text-white transition-all hover:bg-red-700"
          >
            Xem san pham
          </a>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const orderId = getOrderId(order);
            const orderDate = getOrderDate(order);
            const orderItems = getOrderItems(order);
            const statusKey = getOrderStatus(order);
            const status = statusConfig[statusKey] || statusConfig.chuaxuly;
            const isExpanded = expandedOrder === orderId;
            const canCancel =
              statusKey === "chuaxuly" || statusKey === "dangxuly";

            return (
              <div
                key={orderId}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-5">
                  <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-gray-100 p-3">
                      <Package className="text-gray-600" size={24} />
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900">
                        Ma don: #{orderId}
                      </h4>
                      <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
                        <Calendar size={12} />
                        {orderDate
                          ? new Date(orderDate).toLocaleDateString("vi-VN")
                          : "N/A"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-[10px] font-black uppercase ${status.color}`}
                    >
                      {status.icon}
                      {status.label}
                    </span>
                    <button
                      onClick={() => toggleExpand(orderId)}
                      className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100"
                    >
                      {isExpanded ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 border-b border-gray-50 px-5 pb-5 md:grid-cols-2">
                  <div className="flex items-start gap-2">
                    <MapPin size={16} className="mt-1 text-gray-400" />
                    <div>
                      <p className="text-[10px] font-bold uppercase text-gray-400">
                        Dia chi giao hang
                      </p>
                      <p className="text-sm font-bold leading-tight text-gray-700">
                        {order.user?.username || "Khach hang"} | {order.phone}
                      </p>
                      <p className="mt-0.5 text-xs text-gray-500">
                        {order.address}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-center">
                    <p className="text-[10px] font-bold uppercase text-gray-400">
                      Tong thanh toan
                    </p>
                    <p className="text-2xl font-black text-red-600">
                      {getOrderTotal(order).toLocaleString("vi-VN")} VND
                    </p>
                  </div>
                </div>

                {isExpanded && (
                  <div className="animate-in space-y-3 bg-gray-50/50 p-5 duration-300 slide-in-from-top-2">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                        chi tiet san pham
                      </p>
                      {canCancel && (
                        <button
                          type="button"
                          onClick={() => openCancelModal(order)}
                          className="rounded-xl bg-red-600 px-4 py-2 text-xs font-black uppercase tracking-wide text-white transition-colors hover:bg-red-700"
                        >
                          Huy don
                        </button>
                      )}
                    </div>
                    {orderItems.length > 0 ? (
                      orderItems.map((item) => (
                        <div
                          key={
                            item.order_item_id ||
                            `${orderId}-${item.product}-${item.quantity}`
                          }
                          className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-3"
                        >
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                            <Package size={20} className="text-gray-300" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-bold text-gray-800">
                              {item.product_name || item.product || "San pham"}
                            </p>
                            <p className="text-xs font-medium italic text-gray-400">
                              So luong: {item.quantity}
                            </p>
                          </div>
                          <p className="text-sm font-black text-gray-900">
                            {Number(item.price || 0).toLocaleString("vi-VN")} VND
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs italic text-gray-400">
                        Khong co du lieu san pham
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {cancelOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b p-5">
              <div>
                <h2 className="text-lg font-black text-gray-900">
                  Huy don #{getOrderId(cancelOrder)}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Nhap ly do huy don de he thong ghi nhan.
                </p>
              </div>
              <button
                type="button"
                onClick={closeCancelModal}
                className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5">
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Ly do huy don
              </label>
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                rows="5"
                placeholder="Nhap ly do huy don..."
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-red-400 focus:bg-white"
              />
            </div>

            <div className="flex justify-end gap-3 border-t p-5">
              <button
                type="button"
                onClick={closeCancelModal}
                className="rounded-2xl border border-gray-200 px-4 py-2.5 text-sm font-bold text-gray-700 transition hover:bg-gray-50"
              >
                Dong
              </button>
              <button
                type="button"
                onClick={handleCancelOrder}
                disabled={isCancelling}
                className="rounded-2xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-300"
              >
                {isCancelling ? "Dang huy..." : "Xac nhan huy"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tracking;
