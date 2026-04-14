
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import  ApiLogin  from "../../services/authService";
export  function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await ApiLogin.Login({
        username: formData.username,
        password: formData.password,
      });

      if (res?.data?.token) {
        localStorage.setItem("token", res.data.token);
      }
      if (res?.data?.role) {
        localStorage.setItem("role", res.data.role);
      }
      if (res?.data?.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }

      const canAccessAdmin =
        res?.data?.user?.is_superuser ||
        res?.data?.user?.is_staff ||
        res?.data?.role === "superadmin" ||
        res?.data?.role === "admin";
      navigate(canAccessAdmin ? "/admin" : "/");
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Login failed. Please try again.";
      setError(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  from-orange-50 via-indigo-50 to-purple-100 py-10 px-2">
      <div className="w-full max-w-4xl bg-white/80 rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden backdrop-blur-md">
        {/* Left: Welcome */}
        <div className="flex-1 flex flex-col justify-center items-center p-8  from-indigo-100 via-orange-100 to-white">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-700 text-white text-xs uppercase tracking-widest font-bold mb-4">
            Xin Chào !
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-indigo-900 mb-2 text-center whitespace-nowrap">Chào mừng bạn quay lại</h2>
          <p className="text-gray-600 text-center mb-6">Đăng nhập để quản lý sản phẩm, theo dõi cập nhật và đồng bộ mọi thứ.</p>
          <div className="flex gap-3">
            <span className="px-3 py-1 rounded-xl bg-white shadow text-indigo-700 font-semibold text-xs">Nhanh chóng</span>
            <span className="px-3 py-1 rounded-xl bg-white shadow text-orange-500 font-semibold text-xs">Bảo mật</span>
            <span className="px-3 py-1 rounded-xl bg-white shadow text-purple-500 font-semibold text-xs">Hiện đại</span>
          </div>
        </div>
        {/* Right: Login Form */}
        <div className="flex-1 flex flex-col justify-center p-8">
          <div className="mb-6 text-center">
            <h3 className="text-2xl font-bold text-indigo-800 mb-1">Đăng Nhập</h3>
            <p className="text-gray-500 text-sm">Nhập tên đăng nhập và mật khẩu để tiếp tục</p>
          </div>
          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="username">Tên Đăng Nhập</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><FaUser /></span>
                <input
                  id="username"
                  className="pl-10 pr-3 py-3 w-full rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-300 text-base"
                  type="text"
                  name="username"
                  placeholder="Tên đăng nhập"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="password">Mật Khẩu</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><FaLock /></span>
                <input
                  id="password"
                  className="pl-10 pr-3 py-3 w-full rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-300 text-base"
                  type="password"
                  name="password"
                  placeholder="Mật khẩu"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            {error && <p className="bg-red-100 text-red-700 px-3 py-2 rounded-lg text-sm text-center">{error}</p>}
            <button
              className="w-full py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-300 text-base"
              type="submit"
            >
              Đăng Nhập
            </button>
            <p className="text-center text-sm text-gray-500 mt-2">
              Chưa có tài khoản?{' '}
              <Link to="/register" className="text-orange-500 font-semibold hover:underline" >
                Đăng Ký
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login;
