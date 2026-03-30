import { useNavigate, Link } from "react-router-dom";
import logoimg from "../../assets/images/logo.png";

function Header() {
  const navigate = useNavigate();

 
  const token = localStorage.getItem("token");
  const storedRole = localStorage.getItem("role") || "user";

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (err) {
    console.error("Failed to parse user data from localStorage", err);
  }

  const isAuthed = Boolean(token);
  const isAdmin =
    storedRole === "admin" ||
    storedRole === "superadmin" ||
    user?.is_superuser ||
    user?.is_staff;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // --- MOCK DATA (Dữ liệu giả lập cho Giỏ hàng và Đơn hàng) ---
  // Sau này bạn có thể thay thế bằng Redux hoặc API Call
  const cartCount = 0; // Giả sử có 0 sản phẩm trong giỏ hàng
  const orderCount = 1;

  return (
    // <header> nền đỏ, dính chặt lên top (sticky), có bóng đổ
    <header className="bg-[#e30019] sticky top-0 z-[9999] shadow-md">
      {/* Container giới hạn chiều rộng 1200px, căn giữa */}
      <div className="max-w-[1200px] w-full mx-auto px-[10px]">
        {/* Row chứa các thành phần */}
        <div className="flex items-center h-[70px] py-[10px]">
          {/* 1. LOGO */}
          <Link to="/" className="mr-[20px] fill-white shrink-0 ">
            {/* Thẻ hiển thị ảnh logo, đã bo gọn chiều cao h-[40px] */}
            <img
              src={logoimg}
              alt="Shop Công Nghệ Logo"
              className="h-[40px] w-auto object-contain invert brightness-0"
            />
          </Link>
          {/* 2. NÚT DANH MỤC (Có Dropdown Hover) */}
          <div className="relative group mr-[15px] z-[10001]">
            <button className="bg-[#be1e2d] text-white border-none rounded-[5px] px-[15px] flex items-center gap-[8px] cursor-pointer text-[14px] font-bold whitespace-nowrap h-[40px]">
              <svg className="w-[20px] h-[20px] fill-white" viewBox="0 0 24 24">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
              </svg>
              <span>Danh mục</span>
            </button>

            {/* Dropdown Menu - Ẩn mặc định, hiện khi hover vào group */}
            <ul className="absolute top-full left-0 bg-white min-w-[220px] shadow-[0_5px_15px_rgba(0,0,0,0.2)] rounded-[4px] py-[10px] hidden group-hover:block mt-[5px] border border-[#eee]">
              <li>
                <Link
                  to="/category/ao"
                  className="block px-[20px] py-[10px] text-[#333] text-[14px] font-medium transition-all duration-200 border-b border-dashed border-[#f0f0f0] hover:bg-[#f9f9f9] hover:text-[#e30019] hover:pl-[25px]"
                >
                  Laptop - Máy tính
                </Link>
              </li>
              <li>
                <Link
                  to="/category/quan"
                  className="block px-[20px] py-[10px] text-[#333] text-[14px] font-medium transition-all duration-200 border-b border-dashed border-[#f0f0f0] hover:bg-[#f9f9f9] hover:text-[#e30019] hover:pl-[25px]"
                >
                  Điện thoại - Phụ kiện
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="block px-[20px] py-[10px] text-[#333] text-[14px] font-medium transition-all duration-200 hover:bg-[#f9f9f9] hover:text-[#e30019] hover:pl-[25px]"
                >
                  Tất cả sản phẩm
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Ô TÌM KIẾM */}
          <form className="bg-white rounded-[5px] flex items-center grow h-[40px] px-[10px] max-w-[500px]">
            <input
              type="text"
              placeholder="Bạn cần tìm gì?"
              className="border-none outline-none grow text-[14px] text-[#333] pr-[10px] bg-transparent"
            />
            <button
              type="submit"
              className="bg-transparent border-none cursor-pointer flex items-center justify-center"
            >
              <svg
                className="w-[18px] h-[18px] fill-[#333]"
                viewBox="0 0 512 512"
              >
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
              </svg>
            </button>
          </form>

          {/* 4. THANH NAVIGATION (Bên phải) */}
          <nav className="ml-auto">
            <ul className="flex items-center gap-[15px] m-0 p-0 list-none">
              {/* Nút Hotline */}
              <li>
                <a
                  href="tel:18006975"
                  className="flex items-center gap-[8px] text-white px-[8px] py-[5px] rounded-[5px] hover:bg-white/15 transition-colors"
                >
                  <svg
                    className="w-[24px] h-[24px] stroke-white fill-none shrink-0"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                  >
                    <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
                  </svg>
                  <div className="text-[12px] font-medium leading-[1.3] text-left">
                    Hotline
                    <br />
                    1800.6975
                  </div>
                </a>
              </li>

              {/* Nút Tra cứu đơn hàng */}
              <li>
                <Link
                  to={isAuthed ? "/donhang_cuatoi" : "/login"}
                  className="flex items-center gap-[8px] text-white px-[8px] py-[5px] rounded-[5px] hover:bg-white/15 transition-colors"
                >
                  <div className="relative flex">
                    <svg
                      className="w-[24px] h-[24px] stroke-white fill-none shrink-0"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    {isAuthed && orderCount > 0 && (
                      <span className="absolute -top-[5px] -right-[8px] bg-[#ffc107] text-black text-[10px] font-bold h-[16px] w-[16px] flex items-center justify-center rounded-full">
                        {orderCount}
                      </span>
                    )}
                  </div>
                  <div className="text-[12px] font-medium leading-[1.3] text-left">
                    Tra cứu
                    <br />
                    đơn hàng
                  </div>
                </Link>
              </li>

              {/* Nút Giỏ hàng */}
              <li>
                <Link
                  to="/giohang"
                  className="flex items-center gap-[8px] text-white px-[8px] py-[5px] rounded-[5px] hover:bg-white/15 transition-colors"
                >
                  <div className="relative flex">
                    <svg
                      className="w-[24px] h-[24px] stroke-white fill-none shrink-0"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                    >
                      <circle cx="9" cy="21" r="1"></circle>
                      <circle cx="20" cy="21" r="1"></circle>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    <span className="absolute -top-[5px] -right-[8px] bg-[#fdd835] text-[#e30019] text-[10px] font-bold h-[16px] w-[16px] flex items-center justify-center rounded-full border border-[#e30019]">
                      {cartCount}
                    </span>
                  </div>
                  <div className="text-[12px] font-medium leading-[1.3] text-left">
                    Giỏ
                    <br />
                    hàng
                  </div>
                </Link>
              </li>

              {/* Khối Đăng nhập / User Menu */}
              <li>
                {isAuthed ? (
                  // Đã đăng nhập: Hiện tên và Dropdown Menu
                  <div className="relative group z-[10001]">
                    <div className="flex items-center gap-[8px] text-white px-[12px] py-[6px] rounded-[5px] bg-[#be1e2d] cursor-pointer hover:bg-[#990000] transition-colors">
                      <svg
                        className="w-[24px] h-[24px] stroke-white fill-none shrink-0"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      <div className="text-[13px] font-medium leading-[1.3] text-left">
                        Chào, {user?.username?.split(" ").pop() || "Bạn"}
                      </div>
                    </div>

                    {/* Menu xổ xuống của User */}
                    <ul className="absolute top-full right-0 bg-white min-w-[200px] shadow-[0_5px_15px_rgba(0,0,0,0.2)] rounded-[4px] py-[10px] hidden group-hover:block mt-[5px] border border-[#eee]">
                      {isAdmin && (
                        <li>
                          <Link
                            to="/admin"
                            className="block px-[20px] py-[10px] text-[#333] text-[14px] transition-colors hover:bg-[#f9f9f9] hover:text-[#e30019]"
                          >
                            Trang quản trị
                          </Link>
                        </li>
                      )}
                      <li>
                        <Link
                          to="/profile"
                          className="block px-[20px] py-[10px] text-[#333] text-[14px] transition-colors hover:bg-[#f9f9f9] hover:text-[#e30019]"
                        >
                          Tài khoản của tôi
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/donhang_cuatoi"
                          className="block px-[20px] py-[10px] text-[#333] text-[14px] transition-colors border-b border-[#eee] hover:bg-[#f9f9f9] hover:text-[#e30019]"
                        >
                          Đơn hàng của tôi
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-[20px] py-[10px] text-red-600 text-[14px] font-medium transition-colors hover:bg-[#fff0f0]"
                        >
                          Đăng xuất
                        </button>
                      </li>
                    </ul>
                  </div>
                ) : (
                  // Chưa đăng nhập: Hiện nút Đăng nhập
                  <Link
                    to="/login"
                    className="flex items-center gap-[8px] text-white px-[12px] py-[6px] rounded-[5px] bg-[#be1e2d] hover:bg-[#990000] transition-colors"
                  >
                    <svg
                      className="w-[24px] h-[24px] stroke-white fill-none shrink-0"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <div className="text-[12px] font-medium leading-[1.3] text-left">
                      Đăng
                      <br />
                      nhập
                    </div>
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
