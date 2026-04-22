import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

function Cart() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const updateCart = (newCart) => {
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    window.dispatchEvent(new Event("cartChange"));
  };

  const updateQuantity = (id, delta) => {
    const newCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, (item.quantity || 1) + delta) } : item
    );
    updateCart(newCart);
  };

  const removeItem = (id) => {
    const newCart = cartItems.filter((item) => item.id !== id);
    updateCart(newCart);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-[1200px] mx-auto my-10 p-10 bg-white rounded-lg shadow-sm text-center border">
        <ShoppingBag className="mx-auto h-16 w-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold mb-4">Giỏ hàng của bạn đang trống</h2>
        <p className="text-gray-500 mb-6">Hãy lấp đầy nó bằng những sản phẩm tuyệt vời!</p>
        <Link to="/product" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-all">
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8 flex items-center gap-2 text-gray-800">
        Giỏ hàng của bạn <span className="text-gray-400 text-lg">({cartItems.length})</span>
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:border-blue-200 transition-all">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-contain rounded-md" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 line-clamp-1">{item.name}</h3>
                <p className="text-red-600 font-bold mt-1">{Number(item.price).toLocaleString()} ₫</p>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                    <button onClick={() => updateQuantity(item.id, -1)} className="p-2 hover:bg-gray-200"><Minus size={14} /></button>
                    <span className="w-10 text-center text-sm font-bold">{item.quantity || 1}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="p-2 hover:bg-gray-200"><Plus size={14} /></button>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1 text-sm">
                    <Trash2 size={16} /> <span>Xóa</span>
                  </button>
                </div>
              </div>
              <div className="text-right hidden sm:block">
                <p className="font-bold text-lg text-gray-800">{(item.price * (item.quantity || 1)).toLocaleString()} ₫</p>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full lg:w-[350px]">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
            <h2 className="text-lg font-bold mb-4 border-b pb-4 text-gray-800 uppercase tracking-tight">Tóm tắt đơn hàng</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Tổng tiền hàng:</span>
                <span className="font-medium text-gray-800">{subtotal.toLocaleString()} ₫</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Phí vận chuyển:</span>
                <span className="text-green-500 font-bold">Miễn phí</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-xl text-red-600">
                <span>Tổng cộng:</span>
                <span>{subtotal.toLocaleString()} ₫</span>
              </div>
            </div>
            <Link to='/pay' className="block bg-red-600 text-white py-4 rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-100 uppercase tracking-wide text-center">
              Tiến hành thanh toán
            </Link>
            
          </div>
        </div>
      </div>
    </div>
  );
}
export default Cart;