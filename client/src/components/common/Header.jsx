import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logoimg from "../../assets/images/logo.png";

function getCartCount() {
  try {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    return cart.reduce(
      (sum, item) => sum + Number(item.quantity || 1),
      0
    );
  } catch {
    return 0;
  }
}

function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const storedRole = localStorage.getItem("role") || "user";
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(() => getCartCount());

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

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
  const accountTarget = isAdmin ? "/admin/users" : "/user";
  const accountLabel = isAdmin ? "Quản lý người dùng" : "Tài khoản của tôi";

  const handleLogout = () => {
    localStorage.clear();
    setIsOpen(false);
    setCartCount(0);
    navigate("/login");
  };

  const orderCount = 1;

  useEffect(() => {
    const syncCartCount = () => {
      setCartCount(getCartCount());
    };

    syncCartCount();
    window.addEventListener("cartChange", syncCartCount);
    window.addEventListener("storage", syncCartCount);

    return () => {
      window.removeEventListener("cartChange", syncCartCount);
      window.removeEventListener("storage", syncCartCount);
    };
  }, []);

  return (
    <header
      className="sticky top-0 z-[9999] bg-[#e30019] shadow-md"
      onClick={() => setIsOpen(false)}
    >
      <div className="mx-auto w-full max-w-[1200px] px-[10px]">
        <div className="flex h-[70px] items-center py-[10px]">
          <Link to="/" className="mr-[20px] shrink-0 fill-white">
            <img
              src={logoimg}
              alt="Shop Cong Nghe Logo"
              className="h-[40px] w-auto object-contain invert brightness-0"
            />
          </Link>

          <form className="flex h-[40px] grow items-center rounded-[5px] bg-white px-[10px] max-w-[500px]">
            <input
              type="text"
              placeholder="Bạn cần tìm gì?"
              className="grow border-none bg-transparent pr-[10px] text-[14px] text-[#333] outline-none"
            />
            <button
              type="submit"
              className="flex cursor-pointer items-center justify-center border-none bg-transparent"
            >
              <svg className="h-[18px] w-[18px] fill-[#333]" viewBox="0 0 512 512">
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
              </svg>
            </button>
          </form>

          <nav className="ml-auto">
            <ul className="m-0 flex list-none items-center gap-[15px] p-0">
              <li>
                <a
                  href="tel:18006975"
                  className="flex items-center gap-[8px] rounded-[5px] px-[8px] py-[5px] text-white transition-colors hover:bg-white/15"
                >
                  <svg
                    className="h-[24px] w-[24px] shrink-0 fill-none stroke-white"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                  >
                    <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
                  </svg>
                  <div className="text-left text-[12px] font-medium leading-[1.3]">
                    Hotline
                    <br />
                    1800.6975
                  </div>
                </a>
              </li>

              <li>
                <Link
                  to={isAuthed ? "/Tracking" : "/pay"}
                  className="flex items-center gap-[8px] rounded-[5px] px-[8px] py-[5px] text-white transition-colors hover:bg-white/15"
                >
                  <div className="relative flex">
                    <svg
                      className="h-[24px] w-[24px] shrink-0 fill-none stroke-white"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                    </svg>
                    {isAuthed && orderCount > 0 && (
                      <span className="absolute -right-[8px] -top-[5px] flex h-[16px] w-[16px] items-center justify-center rounded-full bg-[#ffc107] text-[10px] font-bold text-black">
                        {orderCount}
                      </span>
                    )}
                  </div>
                  <div className="text-left text-[12px] font-medium leading-[1.3]">
                    Tra cứu
                    <br />
                    đơn hàng
                  </div>
                </Link>
              </li>

              <li>
                <Link
                  to="/Cart"
                  className="flex items-center gap-[8px] rounded-[5px] px-[8px] py-[5px] text-white transition-colors hover:bg-white/15"
                >
                  <div className="relative flex">
                    <svg
                      className="h-[24px] w-[24px] shrink-0 fill-none stroke-white"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                    >
                      <circle cx="9" cy="21" r="1"></circle>
                      <circle cx="20" cy="21" r="1"></circle>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    <span className="absolute -right-[8px] -top-[5px] flex h-[16px] w-[16px] items-center justify-center rounded-full border border-[#e30019] bg-[#fdd835] text-[10px] font-bold text-[#e30019]">
                      {cartCount}
                    </span>
                  </div>
                  <div className="text-left text-[12px] font-medium leading-[1.3]">
                    Giỏ
                    <br />
                    hàng
                  </div>
                </Link>
              </li>

              <li className="relative">
                {isAuthed ? (
                  <div className="relative z-[10001]">
                    <div
                      onClick={toggleMenu}
                      className="flex cursor-pointer items-center gap-[8px] rounded-[5px] bg-[#be1e2d] px-[12px] py-[6px] text-white transition-colors hover:bg-[#990000]"
                    >
                      <svg
                        className="h-[24px] w-[24px] shrink-0 fill-none stroke-white"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      <div className="text-left text-[13px] font-medium leading-[1.3]">
                        Chào, {user?.username?.split(" ").pop() || "Bạn"}
                      </div>
                    </div>

                    <ul
                      className={`absolute right-0 top-full mt-[5px] min-w-[200px] rounded-[4px] border border-[#eee] bg-white py-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.2)] ${
                        isOpen ? "block" : "hidden"
                      }`}
                    >
                      {isAdmin && (
                        <li>
                          <Link
                            to="/admin"
                            className="block px-[20px] py-[10px] text-[14px] text-[#333] transition-colors hover:bg-[#f9f9f9] hover:text-[#e30019]"
                            onClick={() => setIsOpen(false)}
                          >
                            Dashboard
                          </Link>
                        </li>
                      )}
                      <li>
                        <Link
                          to={accountTarget}
                          className="block px-[20px] py-[10px] text-[14px] text-[#333] transition-colors hover:bg-[#f9f9f9] hover:text-[#e30019]"
                          onClick={() => setIsOpen(false)}
                        >
                          {accountLabel}
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="w-full px-[20px] py-[10px] text-left text-[14px] font-medium text-red-600 transition-colors hover:bg-[#fff0f0]"
                        >
                          Đăng xuất
                        </button>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center gap-[8px] rounded-[5px] bg-[#be1e2d] px-[12px] py-[6px] text-white transition-colors hover:bg-[#990000]"
                  >
                    <svg
                      className="h-[24px] w-[24px] shrink-0 fill-none stroke-white"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <div className="text-left text-[12px] font-medium leading-[1.3]">
                      Dang
                      <br />
                      nhap
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
