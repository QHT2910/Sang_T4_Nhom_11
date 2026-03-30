import { Link } from "react-router-dom";
// Nếu bạn có file ảnh banner nhỏ, hãy import nó vào đây giống như logo nhé
import bannernho from "../../assets/images/banernho.png";

function Footer() {
  return (
    <>
      {/* =========================================
          1. BANNER LỚN CUỐI TRANG
          ========================================= */}
      <div className="w-full mt-[30px]">
        <Link to="/">
          <img
            // Thay src bằng biến {bannerImg} nếu bạn đã import ảnh ở trên
            src={bannernho}
            alt="Banner Khuyến Mãi"
            className="w-full h-auto block object-cover rounded-none"
          />
        </Link>
      </div>

      {/* =========================================
          2. FOOTER SECTION
          ========================================= */}
      <footer className="bg-white pt-[40px] border-t-[4px] border-[#f0f0f0] mt-0">
        {/* Container giới hạn 1200px */}
        <div className="max-w-[1200px] w-full mx-auto px-[10px]">
          {/* --- FOOTER TOP: CHIA 5 CỘT --- */}
          <div className="flex flex-wrap justify-between gap-[20px] pb-[30px]">
            {/* Cột 1: Về chúng tôi */}
            <div className="flex-1 min-w-[180px]">
              <h3 className="text-[13px] font-bold text-[#333] uppercase mb-[15px]">
                VỀ CHÚNG TÔI
              </h3>
              <ul className="list-none p-0 m-0">
                <li className="mb-[8px]">
                  <Link
                    to="/about"
                    className="text-[12px] text-[#333] transition-colors duration-200 hover:text-[#e30019]"
                  >
                    Giới thiệu
                  </Link>
                </li>
                <li className="mb-[8px]">
                  <Link
                    to="/tuyendung"
                    className="text-[12px] text-[#333] transition-colors duration-200 hover:text-[#e30019]"
                  >
                    Tuyển dụng
                  </Link>
                </li>
                <li className="mb-[8px]">
                  <Link
                    to="/contact"
                    className="text-[12px] text-[#333] transition-colors duration-200 hover:text-[#e30019]"
                  >
                    Liên hệ
                  </Link>
                </li>
                <li className="mb-[8px]">
                  <Link
                    to="/blog"
                    className="text-[12px] text-[#333] transition-colors duration-200 hover:text-[#e30019]"
                  >
                    Blog công nghệ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Cột 2: Chính sách */}
            <div className="flex-1 min-w-[180px]">
              <h3 className="text-[13px] font-bold text-[#333] uppercase mb-[15px]">
                CHÍNH SÁCH
              </h3>
              <ul className="list-none p-0 m-0">
                <li className="mb-[8px]">
                  <Link
                    to="/chinh-sach-doi-tra"
                    className="text-[12px] text-[#333] transition-colors duration-200 hover:text-[#e30019]"
                  >
                    Chính sách đổi trả
                  </Link>
                </li>
                <li className="mb-[8px]">
                  <Link
                    to="/chinh-sach-giao-hang"
                    className="text-[12px] text-[#333] transition-colors duration-200 hover:text-[#e30019]"
                  >
                    Chính sách giao hàng
                  </Link>
                </li>
                <li className="mb-[8px]">
                  <Link
                    to="/chinh-sach-bao-mat"
                    className="text-[12px] text-[#333] transition-colors duration-200 hover:text-[#e30019]"
                  >
                    Chính sách bảo mật
                  </Link>
                </li>
                <li className="mb-[8px]">
                  <Link
                    to="/kiem-hang"
                    className="text-[12px] text-[#333] transition-colors duration-200 hover:text-[#e30019]"
                  >
                    Kiểm hàng
                  </Link>
                </li>
              </ul>
            </div>

            {/* Cột 3: Thông tin */}
            <div className="flex-1 min-w-[180px]">
              <h3 className="text-[13px] font-bold text-[#333] uppercase mb-[15px]">
                THÔNG TIN
              </h3>
              <ul className="list-none p-0 m-0">
                <li className="mb-[8px]">
                  <Link
                    to="/he-thong-cua-hang"
                    className="text-[12px] text-[#333] transition-colors duration-200 hover:text-[#e30019]"
                  >
                    Hệ thống cửa hàng
                  </Link>
                </li>
                <li className="mb-[8px]">
                  <Link
                    to="/huong-dan-mua-hang"
                    className="text-[12px] text-[#333] transition-colors duration-200 hover:text-[#e30019]"
                  >
                    Hướng dẫn mua hàng
                  </Link>
                </li>
                <li className="mb-[8px]">
                  <Link
                    to="/huong-dan-thanh-toan"
                    className="text-[12px] text-[#333] transition-colors duration-200 hover:text-[#e30019]"
                  >
                    Hướng dẫn thanh toán
                  </Link>
                </li>
                <li className="mb-[8px]">
                  <Link
                    to="/tra-gop"
                    className="text-[12px] text-[#333] transition-colors duration-200 hover:text-[#e30019]"
                  >
                    Chính sách trả góp
                  </Link>
                </li>
              </ul>
            </div>

            {/* Cột 4: Tổng đài hỗ trợ */}
            <div className="flex-1 min-w-[180px]">
              <h3 className="text-[13px] font-bold text-[#333] uppercase mb-[15px]">
                TỔNG ĐÀI HỖ TRỢ (8:00 - 21:00)
              </h3>
              <div>
                <p className="text-[12px] mb-[8px] text-[#333]">
                  Mua hàng:{" "}
                  <a
                    href="tel:18006975"
                    className="text-[#288ad6] font-bold text-[13px] hover:underline"
                  >
                    1800 6975
                  </a>
                </p>
                <p className="text-[12px] mb-[8px] text-[#333]">
                  CSKH:{" "}
                  <a
                    href="tel:18006173"
                    className="text-[#288ad6] font-bold text-[13px] hover:underline"
                  >
                    1800 6173
                  </a>
                </p>
                <p className="text-[12px] mb-[8px] text-[#333]">
                  Email:{" "}
                  <a
                    href="mailto:baokun6b@gmail.com"
                    className="text-[#333] hover:text-[#e30019] transition-colors"
                  >
                    baokun6b@gmail.com
                  </a>
                </p>
              </div>
            </div>

            {/* Cột 5: Vận chuyển & Thanh toán */}
            <div className="flex-1 min-w-[180px]">
              <h3 className="text-[13px] font-bold text-[#333] uppercase mb-[15px]">
                ĐƠN VỊ VẬN CHUYỂN
              </h3>
              {/* LƯU Ý: Phải cài đặt FontAwesome trong file index.html để các thẻ <i> này hiển thị icon */}
              <div className="flex gap-[10px] flex-wrap">
                <i className="fa-solid fa-truck-fast text-[24px] text-[#555] border border-[#eee] p-[5px] rounded-[4px] w-[40px] h-[30px] flex items-center justify-center"></i>
                <i className="fa-solid fa-truck text-[24px] text-[#555] border border-[#eee] p-[5px] rounded-[4px] w-[40px] h-[30px] flex items-center justify-center"></i>
                <i className="fa-brands fa-fedex text-[24px] text-[#555] border border-[#eee] p-[5px] rounded-[4px] w-[40px] h-[30px] flex items-center justify-center"></i>
              </div>

              <h3 className="text-[13px] font-bold text-[#333] uppercase mt-[15px] mb-[15px]">
                CÁCH THỨC THANH TOÁN
              </h3>
              <div className="flex gap-[10px] flex-wrap">
                <i className="fa-brands fa-cc-visa text-[24px] text-[#555] border border-[#eee] p-[5px] rounded-[4px] w-[40px] h-[30px] flex items-center justify-center"></i>
                <i className="fa-brands fa-cc-mastercard text-[24px] text-[#555] border border-[#eee] p-[5px] rounded-[4px] w-[40px] h-[30px] flex items-center justify-center"></i>
                <i className="fa-solid fa-money-bill-wave text-[24px] text-[#555] border border-[#eee] p-[5px] rounded-[4px] w-[40px] h-[30px] flex items-center justify-center"></i>
                <i className="fa-solid fa-qrcode text-[24px] text-[#555] border border-[#eee] p-[5px] rounded-[4px] w-[40px] h-[30px] flex items-center justify-center"></i>
              </div>
            </div>
          </div>

          {/* --- FOOTER BOTTOM: MẠNG XÃ HỘI --- */}
          <div className="border-t border-[#eee] py-[20px] flex justify-between items-center flex-wrap gap-[10px]">
            <div className="flex items-center gap-[10px] flex-wrap">
              <span className="text-[12px] font-bold uppercase mr-[10px] text-[#333]">
                KẾT NỐI VỚI CHÚNG TÔI
              </span>
              <a
                href="#"
                className="w-[30px] h-[30px] rounded-full bg-[#3b5998] text-white flex items-center justify-center text-[14px] transition-colors hover:opacity-80"
              >
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="w-[30px] h-[30px] rounded-full bg-black text-white flex items-center justify-center text-[14px] transition-colors hover:opacity-80"
              >
                <i className="fa-brands fa-tiktok"></i>
              </a>
              <a
                href="#"
                className="w-[30px] h-[30px] rounded-full bg-[#c4302b] text-white flex items-center justify-center text-[14px] transition-colors hover:opacity-80"
              >
                <i className="fa-brands fa-youtube"></i>
              </a>
              <a
                href="#"
                className="bg-[#0068ff] text-white text-[10px] font-bold rounded-[10px] px-[8px] h-[30px] flex items-center justify-center transition-colors hover:opacity-80"
              >
                Zalo
              </a>
            </div>

            {/* Thêm một dòng Copyright nhỏ cho chuyên nghiệp */}
            <div className="text-[12px] text-[#777]">
              © 2024 - Bản quyền của Shop Công Nghệ
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
