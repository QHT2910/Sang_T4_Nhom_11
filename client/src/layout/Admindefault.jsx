import { NavLink, Outlet, useNavigate } from "react-router-dom";

const adminNavItems = [
  {
    to: "/admin",
    label: "Dashboard",
    description: "Tong quan he thong",
  },
  {
    to: "/admin/users",
    label: "Quan ly tai khoan",
    description: "User va admin",
  },
  {
    to: "/admin/products",
    label: "San pham",
    description: "Kho va danh muc",
  },
  {
    to: "/admin/orders",
    label: "Quan ly don hang",
    description: "Don hang va trang thai",
  }
];

function Admindefault() {
  const navigate = useNavigate();

  const storedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  const displayName =
    storedUser?.username || storedUser?.email || localStorage.getItem("role") || "Admin";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#fdf2f8_0%,#f8fafc_35%,#eef2ff_100%)]">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="flex items-center gap-3 text-left"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 via-orange-500 to-amber-400 text-lg font-bold text-white shadow-lg shadow-rose-200">
                AP
              </span>
              <span>
                <span className="block text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
                  Control Center
                </span>
                <span className="block text-xl font-bold text-slate-900">
                  Admin Workspace
                </span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="hidden rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-900 sm:inline-flex"
            >
              Ve trang chu
            </button>
          </div>

          <div className="flex flex-1 flex-col gap-4 lg:items-end">
            <nav className="flex flex-wrap gap-2">
              {adminNavItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/admin"}
                  className={({ isActive }) =>
                    `rounded-2xl border px-4 py-3 text-sm transition ${
                      isActive
                        ? "border-slate-900 bg-slate-900 text-white shadow-lg shadow-slate-300"
                        : "border-slate-200 bg-white/90 text-slate-600 hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-900"
                    }`
                  }
                >
                  <span className="block font-semibold">{item.label}</span>
                  <span className="mt-1 block text-xs opacity-75">{item.description}</span>
                </NavLink>
              ))}
            </nav>

            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Dang nhap
                </p>
                <p className="text-sm font-semibold text-slate-900">{displayName}</p>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-2xl bg-gradient-to-r from-rose-500 to-orange-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-200 transition hover:-translate-y-0.5"
              >
                Dang xuat
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default Admindefault;
