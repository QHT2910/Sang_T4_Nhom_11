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
} from "lucide-react";

const getOrderId = (order) => order.order_id || order.id;
const getOrderDate = (order) => order.order_date || order.created_at;
const getOrderItems = (order) => order.order_items || order.items || [];
const getOrderTotal = (order) =>
  Number(order.total || order.total_amount || order.total_price || 0);

function Tracking() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await orderApi.getUserOrders();
        const sortedOrders = [...(res.data || [])].sort((a, b) => {
          const leftDate = new Date(getOrderDate(a) || 0).getTime();
          const rightDate = new Date(getOrderDate(b) || 0).getTime();
          return rightDate - leftDate;
        });
        setOrders(sortedOrders);
      } catch (err) {
        console.error("Lỗi không thấy sản phẩm:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const statusConfig = {
    pending: {
      label: "Chờ xử lý",
      color: "text-yellow-600 bg-yellow-50 border-yellow-100",
      icon: <Clock size={16} />,
    },
    processing: {
      label: "Đang chuẩn bị",
      color: "text-blue-600 bg-blue-50 border-blue-100",
      icon: <Package size={16} />,
    },
    shipping: {
      label: "Đang giao hàng",
      color: "text-purple-600 bg-purple-50 border-purple-100",
      icon: <Truck size={16} />,
    },
    delivered: {
      label: "Đã hoàn thành",
      color: "text-green-600 bg-green-50 border-green-100",
      icon: <CheckCircle size={16} />,
    },
    deleted: {
      label: "Đã hủy",
      color: "text-red-600 bg-red-50 border-red-100",
      icon: <XCircle size={16} />,
    },
  };

  const toggleExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        <p className="mt-4 text-gray-500 font-medium">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 min-h-screen bg-gray-50">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter flex items-center gap-3">
          <ShoppingBag className="text-red-600" size={32} />
          Đơn hàng của tôi
        </h1>
        <p className="text-gray-500 mt-1">theo dõi tiến độ và lịch sử</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200 shadow-sm">
          <ShoppingBag size={64} className="mx-auto text-gray-200 mb-4" />
          <h3 className="text-xl font-bold text-gray-800">Chưa có đơn hàng</h3>
          <p className="text-gray-500 mt-2 mb-6">Chưa thực hiện giao dịch nào.</p>
          <a
            href="/product"
            className="inline-block bg-red-600 text-white px-8 py-3 rounded-xl font-black uppercase tracking-wide hover:bg-red-700 transition-all"
          >
            Xem sản phẩm
          </a>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const orderId = getOrderId(order);
            const orderDate = getOrderDate(order);
            const orderItems = getOrderItems(order);
            const status =
              typeof order.status === "string"
                ? statusConfig[order.status] || statusConfig.pending
                : order.status
                  ? statusConfig.delivered
                  : statusConfig.pending;
            const isExpanded = expandedOrder === orderId;

            return (
              <div
                key={orderId}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-5 flex flex-wrap justify-between items-center gap-4 bg-white">
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-100 p-3 rounded-xl">
                      <Package className="text-gray-600" size={24} />
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900">Ma don: #{orderId}</h4>
                      <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                        <Calendar size={12} />
                        {orderDate ? new Date(orderDate).toLocaleDateString("vi-VN") : "N/A"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`flex items-center gap-1.5 text-[10px] font-black uppercase px-4 py-2 rounded-full border ${status.color}`}
                    >
                      {status.icon}
                      {status.label}
                    </span>
                    <button
                      onClick={() => toggleExpand(orderId)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
                    >
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>
                </div>

                <div className="px-5 pb-5 grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-gray-50">
                  <div className="flex items-start gap-2">
                    <MapPin size={16} className="text-gray-400 mt-1" />
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">Dia chi giao hang</p>
                      <p className="text-sm font-bold text-gray-700 leading-tight">
                        {order.user?.username || "Khach hang"} | {order.phone}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{order.address}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-center">
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Tong thanh toan</p>
                    <p className="text-2xl font-black text-red-600">
                      {getOrderTotal(order).toLocaleString()} VND
                    </p>
                  </div>
                </div>

                {isExpanded && (
                  <div className="bg-gray-50/50 p-5 space-y-3 animate-in slide-in-from-top-2 duration-300">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                      chi tiết sản phẩm
                    </p>
                    {orderItems.length > 0 ? (
                      orderItems.map((item) => (
                        <div
                          key={item.order_item_id || `${orderId}-${item.product}-${item.quantity}`}
                          className="flex items-center gap-4 p-3 bg-white border border-gray-100 rounded-xl"
                        >
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Package size={20} className="text-gray-300" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-gray-800 truncate">
                              {item.product_name || item.product || "San pham"}
                            </p>
                            <p className="text-xs text-gray-400 font-medium italic">
                              So luong: {item.quantity}
                            </p>
                          </div>
                          <p className="text-sm font-black text-gray-900">
                            {Number(item.price || 0).toLocaleString()} VND
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-gray-400 italic">
                        Không có dữ liệu sản phẩm
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Tracking;
