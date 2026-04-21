import React from "react";

function UserInfo() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = localStorage.getItem("role");

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 min-h-screen bg-gray-50">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">
        {/* Cột trái: Avatar & Role */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-10 text-white flex flex-col items-center justify-center md:w-1/3">
           <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-4xl font-bold mb-4 backdrop-blur-sm border-2 border-white/30">
             {user.username?.charAt(0).toUpperCase() || "U"}
           </div>
           <h2 className="text-xl font-bold mb-1">{user.username || "Guest"}</h2>
           <span className="px-3 py-1 bg-white/20 rounded-full text-[10px] uppercase tracking-widest font-bold">
             {role || "user"}
           </span>
        </div>

        {/* Cột phải: Details */}
        <div className="p-10 flex-1">
           <h3 className="text-2xl font-bold text-gray-800 mb-8 border-b pb-4">Thông tin cá nhân</h3>
           <div className="space-y-6">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-gray-400 uppercase">Địa chỉ Email</span>
                <span className="text-lg font-medium text-gray-700">{user.email || "Chưa cập nhật"}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-gray-400 uppercase">Mã định danh (UID)</span>
                <span className="text-lg font-medium text-gray-700">#{user.user_id || "N/A"}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-green-600">Đang hoạt động</span>
              </div>
           </div>
           
           <button 
             onClick={() => { localStorage.clear(); window.location.href = "/login"; }}
             className="mt-10 px-6 py-2 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-600 hover:text-white transition-all"
           >
             Đăng xuất tài khoản
           </button>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;