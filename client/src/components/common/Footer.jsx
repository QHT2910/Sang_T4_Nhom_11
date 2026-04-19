import { Link } from "react-router-dom";
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
        <div className="max-w-[1200px] w-full mx-auto px-[10px]">
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
                    className="text-[12px] text-[#333] hover:text-[#e30019]"
                  >
                    Giới thiệu
                  </Link>
                </li>
              </ul>
            </div>

            {/* Cột 2: Chính sách - ĐÃ ĐƯỢC CẬP NHẬT */}
            <div className="flex-1 min-w-[180px]">
              <h3 className="text-[13px] font-bold text-[#333] uppercase mb-[15px]">
                CHÍNH SÁCH - HỖ TRỢ
              </h3>
              <ul className="list-none p-0 m-0">
                <li className="mb-[8px]">
                  {/* Gộp 4 nội dung thành 1 và dẫn về trang /chinhsach */}
                  <Link
                    to="/chinhsach"
                    className="text-[12px] text-[#333] transition-colors duration-200 hover:text-[#e30019] "
                  >
                    Chính sách của chúng tôi
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
                    className="text-[12px] text-[#333] hover:text-[#e30019]"
                  >
                    Hệ thống cửa hàng
                  </Link>
                </li>
              </ul>
            </div>

            {/* Cột 4: Tổng đài hỗ trợ */}
            <div className="flex-1 min-w-[180px]">
              <h3 className="text-[13px] font-bold text-[#333] uppercase mb-[15px]">
                TỔNG ĐÀI HỖ TRỢ
              </h3>
              <div>
                <p className="text-[12px] mb-[8px]">
                  Mua hàng:{" "}
                  <span className="text-[#288ad6] font-bold">1800 6975</span>
                </p>
                <p className="text-[12px] mb-[8px]">
                  CSKH:{" "}
                  <span className="text-[#288ad6] font-bold">1800 6173</span>
                </p>
              </div>
            </div>

            {/* Cột 5: Vận chuyển & Thanh toán */}
            <div className="flex-1 min-w-[180px]">
              <h3 className="text-[13px] font-bold text-[#333] uppercase mb-[15px]">
                VẬN CHUYỂN & THANH TOÁN
              </h3>
              <div className="flex gap-[10px] flex-wrap mb-4">
                <i className="fa-solid fa-truck-fast text-[20px] text-[#555] border p-[5px] rounded w-[40px] flex justify-center"></i>
                <i className="fa-brands fa-fedex text-[20px] text-[#555] border p-[5px] rounded w-[40px] flex justify-center"></i>
              </div>
            </div>
          </div>

          <div className="border-t border-[#eee] py-[20px] flex justify-between items-center flex-wrap gap-[10px]">
            <div className="flex items-center gap-[10px]">
              <span className="text-[12px] font-bold uppercase text-[#333]">
                KẾT NỐI:
              </span>
              <a
                href="#"
                className="w-[30px] h-[30px] rounded-full bg-[#3b5998] text-white flex items-center justify-center hover:opacity-80"
              >
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="w-[30px] h-[30px] rounded-full bg-black text-white flex items-center justify-center hover:opacity-80"
              >
                <i className="fa-brands fa-tiktok"></i>
              </a>
            </div>
            <div className="text-[12px] text-[#777]">
              © 2024 - Bản quyền thuộc về Shop Công Nghệ của Thái Bảo
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
