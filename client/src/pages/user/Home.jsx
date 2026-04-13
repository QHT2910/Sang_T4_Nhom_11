import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import productApi from "../../services/productServices.js";

// IMPORT CÁC ẢNH BANNER (Bạn cần đảm bảo đã copy các ảnh này vào thư mục assets)
// LƯU Ý: Nếu đường dẫn hoặc tên file ảnh của bạn khác, hãy sửa lại ở đây cho đúng nhé!
import bannerDoc from "../../assets/images/banerdoc.png";
import bannerLon from "../../assets/images/banner_msi.1.png";
import banneright from "../../assets/images/banermini1.png";
import banneright2 from "../../assets/images/banermini2.png";
import baner1 from "../../assets/images/banerminh3.png";
import baner2 from "../../assets/images/banermini4.png";
import baner3 from "../../assets/images/banermini5.png";
import banerngang from "../../assets/images/banerdocdai1.png";
import banerngang2 from "../../assets/images/banerdocdai2.png";

function Home() {
  // Logic lấy dữ liệu sản phẩm (Giữ nguyên của bạn)
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await productApi.getProducts();
        setProducts(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        setError("Không tải được sản phẩm", err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  return (
    <main className="bg-[#f5f5f5] pb-10">
      {" "}
      {/* Thêm màu nền xám nhạt như body cũ */}
      {/* =========================================
          KHU VỰC 1: BANNER LAYOUT (Tái tạo từ index.php)
          ========================================= */}
      <div className="max-w-[1200px] w-full mx-auto px-[10px] mt-[15px]">
        {/* main-layout: Dùng flex để chia 2 cột */}
        <div className="flex items-start gap-[15px]">
          {/* CỘT TRÁI: Sidebar Banner (Dính chặt khi cuộn) */}
          <div className="w-[190px] shrink-0 sticky top-[90px] z-[90]">
            <Link
              to="/"
              className="block w-full overflow-hidden rounded-[10px] relative group"
            >
              <img
                src={bannerDoc}
                alt="Banner Dọc"
                className="w-full h-auto min-h-[400px] object-cover transition-transform duration-300 group-hover:scale-105 block"
              />
            </Link>
          </div>

          {/* CỘT PHẢI: Nội dung Grid */}
          <div className="flex-1 flex flex-col gap-[30px] w-[calc(100%-205px)]">
            {/* Thanh menu ngang (Category Nav) */}
            <div className="bg-white rounded-[10px] flex justify-between px-[5px] shadow-sm">
              <Link
                to="/product"
                className="px-[10px] py-[12px] text-[13px] font-semibold text-[#333] hover:text-[#d70018] whitespace-nowrap transition-colors"
              >
                Tất cả sản phẩm
              </Link>
              <Link
                to="/"
                className="px-[10px] py-[12px] text-[13px] font-semibold text-[#333] hover:text-[#d70018] whitespace-nowrap transition-colors"
              >
                Hot Deal
              </Link>
              <Link
                to="/"
                className="px-[10px] py-[12px] text-[13px] font-semibold text-[#333] hover:text-[#d70018] whitespace-nowrap transition-colors"
              >
                Pc / Máy tính
              </Link>
              <Link
                to="/"
                className="px-[10px] py-[12px] text-[13px] font-semibold text-[#333] hover:text-[#d70018] whitespace-nowrap transition-colors"
              >
                Laptop
              </Link>
            </div>

            {/* Lưới Banner 1 (Top) - Chia tỉ lệ 2.2 : 1 */}
            <div className="grid grid-cols-[2.2fr_1fr] gap-[10px] h-[380px]">
              {/* Ảnh to bên trái */}
              <Link
                to="/"
                className="block w-full h-full overflow-hidden rounded-[10px] relative group"
              >
                <img
                  src={bannerLon}
                  alt="Banner Lớn"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 block"
                />
              </Link>
              {/* 2 Ảnh nhỏ xếp dọc bên phải */}
              <div className="grid grid-rows-2 gap-[10px] h-full">
                <Link
                  to="/"
                  className="block w-full h-full overflow-hidden rounded-[10px] relative group"
                >
                  <img
                    src={banneright}
                    alt="Banner Nhỏ 1"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 block"
                  />
                </Link>
                <Link
                  to="/"
                  className="block w-full h-full overflow-hidden rounded-[10px] relative group"
                >
                  <img
                    src={banneright2}
                    alt="Banner Nhỏ 2"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 block"
                  />
                </Link>
              </div>
            </div>

            {/* Lưới Banner 2 (Middle) - 3 cột bằng nhau */}
            <div className="grid grid-cols-3 gap-[10px] h-[160px]">
              <Link
                to="/"
                className="block w-full h-full overflow-hidden rounded-[10px] relative group"
              >
                <img
                  src={baner1}
                  alt="Middle 1"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 block"
                />
              </Link>
              <Link
                to="/"
                className="block w-full h-full overflow-hidden rounded-[10px] relative group"
              >
                <img
                  src={baner2}
                  alt="Middle 2"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 block"
                />
              </Link>
              <Link
                to="/"
                className="block w-full h-full overflow-hidden rounded-[10px] relative group"
              >
                <img
                  src={baner3}
                  alt="Middle 3"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 block"
                />
              </Link>
            </div>

            {/* Lưới Banner 3 (Bottom) - 2 cột bằng nhau */}
            <div className="grid grid-cols-2 gap-[10px] h-[160px]">
              <Link
                to="/"
                className="block w-full h-full overflow-hidden rounded-[10px] relative group"
              >
                <img
                  src={banerngang}
                  alt="Bottom 1"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 block"
                />
              </Link>
              <Link
                to="/"
                className="block w-full h-full overflow-hidden rounded-[10px] relative group"
              >
                <img
                  src={banerngang2}
                  alt="Bottom 2"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 block"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1200px] w-full mx-auto px-[10px] mt-[40px]">
        {loading ? (
          <div className="text-center p-10 font-bold">Đang tải sản phẩm...</div>
        ) : error ? (
          <div className="text-center p-10 text-red-500">{error}</div>
        ) : (
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-4">Danh sách sản phẩm</h2>
            <div className="flex flex-wrap gap-4">
              {/* Map sản phẩm ra màn hình */}
              {products.map((p) => (
                <div
                  key={p.product_id}
                  className="border p-4 rounded min-w-[200px] w-[200px] hover:shadow-md transition-shadow bg-white flex flex-col"
                >
                  {/* Phần hiển thị hình ảnh */}
                  <div className="w-full h-[160px] mb-3 overflow-hidden rounded">
                    <img
                      src={
                        p.image
                      } /* ĐỌC LƯU Ý BÊN DƯỚI ĐỂ SỬA CHỖ NÀY CHO ĐÚNG */
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Phần hiển thị thông tin */}
                  <h3 className="font-bold text-[#333] text-[14px] line-clamp-2 mb-2 flex-1">
                    {p.name}
                  </h3>
                  <p className="text-red-600 font-bold text-[16px]">
                    {Number(p.price).toLocaleString("vi-VN")} đ
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default Home;
