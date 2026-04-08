
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { ApiLogin } from "../../services/authService";
export function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await ApiLogin.Register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      navigate("/login");
    } catch (err) {
      const message =
        err?.response?.data?.message || "Register failed. Please try again.";
      setError(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-indigo-50 to-purple-100 py-10 px-2">
      <div className="w-full max-w-4xl bg-white/80 rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden backdrop-blur-md">
        {/* Left: Welcome */}
        <div className="flex-1 flex flex-col justify-center items-center p-8 bg-gradient-to-br from-indigo-100 via-orange-100 to-white">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500 text-white text-xs uppercase tracking-widest font-bold mb-4">
            Bắt đầu ngay
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-indigo-900 mb-2 text-center whitespace-nowrap">Tạo tài khoản mới</h2>
          <p className="text-gray-600 text-center mb-6">Tham gia để mở khoá mọi tính năng tuyệt vời của hệ thống.</p>
          <div className="flex gap-3">
            <span className="px-3 py-1 rounded-xl bg-white shadow text-orange-500 font-semibold text-xs">Đơn giản</span>
            <span className="px-3 py-1 rounded-xl bg-white shadow text-indigo-700 font-semibold text-xs">Nhanh chóng</span>
            <span className="px-3 py-1 rounded-xl bg-white shadow text-purple-500 font-semibold text-xs">Bảo mật</span>
          </div>
        </div>
        {/* Right: Register Form */}
        <div className="flex-1 flex flex-col justify-center p-8">
          <div className="mb-6 text-center">
            <h3 className="text-2xl font-bold text-orange-600 mb-1">Đăng Ký</h3>
            <p className="text-gray-500 text-sm">Điền thông tin để bắt đầu sử dụng</p>
          </div>
          <form className="space-y-5" onSubmit={handleRegister}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="username">Tên Đăng Nhập</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><FaUser /></span>
                <input
                  id="username"
                  className="pl-10 pr-3 py-3 w-full rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-300 text-base"
                  type="text"
                  name="username"
                  placeholder="Tên đăng nhập"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="email">Email</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><FaEnvelope /></span>
                <input
                  id="email"
                  className="pl-10 pr-3 py-3 w-full rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-300 text-base"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
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
                  className="pl-10 pr-3 py-3 w-full rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-300 text-base"
                  type="password"
                  name="password"
                  placeholder="Tạo mật khẩu"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            {error && <p className="bg-red-100 text-red-700 px-3 py-2 rounded-lg text-sm text-center">{error}</p>}
            <button
              className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-400 via-pink-400 to-indigo-500 text-white font-bold text-lg shadow hover:scale-[1.02] hover:shadow-lg transition"
              type="submit"
            >
              Tạo tài khoản
            </button>
            <p className="text-center text-sm text-gray-500 mt-2">
              Đã có tài khoản?{' '}
              <Link className="text-orange-500 font-semibold hover:underline" to="/login">
                Đăng nhập
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Register;