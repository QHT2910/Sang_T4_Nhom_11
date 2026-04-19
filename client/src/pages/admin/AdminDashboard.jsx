import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import productApi from "../../services/productServices";
import userApi from "../../services/userAdminService";

function StatCard({ title, value, hint, tone = "blue" }) {
  const toneClasses = {
    blue: "from-blue-500/15 to-sky-500/10 border-blue-200",
    emerald: "from-emerald-500/15 to-green-500/10 border-emerald-200",
    amber: "from-amber-500/15 to-orange-500/10 border-amber-200",
    rose: "from-rose-500/15 to-pink-500/10 border-rose-200",
  };

  return (
    <div
      className={`rounded-3xl border bg-gradient-to-br ${toneClasses[tone]} p-5 shadow-sm`}
    >
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <h3 className="mt-3 text-3xl font-bold text-slate-900">{value}</h3>
      <p className="mt-2 text-sm text-slate-600">{hint}</p>
    </div>
  );
}

function ProgressBlock({ label, value, total, colorClass }) {
  const safeTotal = total || 0;
  const percent = safeTotal ? Math.round((value / safeTotal) * 100) : 0;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-semibold text-slate-900">{label}</p>
          <p className="text-sm text-slate-500">
            {value}/{safeTotal} ({percent}%)
          </p>
        </div>
        <span className="text-sm font-bold text-slate-700">{percent}%</span>
      </div>
      <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full ${colorClass}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const storedUser = (() => {
      try {
        return JSON.parse(localStorage.getItem("user"));
      } catch {
        return null;
      }
    })();

    const isAllowed =
      role === "superadmin" ||
      role === "admin" ||
      storedUser?.is_superuser === true ||
      storedUser?.is_staff === true;

    if (!token) {
      navigate("/login");
      return;
    }

    if (!isAllowed) {
      navigate("/");
      return;
    }

    loadDashboard();
  }, [navigate]);

  const loadDashboard = async () => {
    setLoading(true);
    setError("");
    try {
      const [usersRes, productsRes] = await Promise.all([
        userApi.getUsers(),
        productApi.getProducts(),
      ]);
      setUsers(Array.isArray(usersRes.data) ? usersRes.data : []);
      setProducts(Array.isArray(productsRes.data) ? productsRes.data : []);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Khong the tai du lieu dashboard"
      );
    } finally {
      setLoading(false);
    }
  };

  const metrics = useMemo(() => {
    const totalUsers = users.length;
    const totalProducts = products.length;
    const activeUsers = users.filter((user) => user.is_active).length;
    const superusers = users.filter((user) => user.is_superuser).length;
    const staffUsers = users.filter(
      (user) => user.is_staff && !user.is_superuser
    ).length;
    const normalUsers = users.filter(
      (user) => !user.is_staff && !user.is_superuser
    ).length;
    const inStockProducts = products.filter(
      (product) => Number(product.stock || 0) > 0
    ).length;
    const lowStockProducts = products.filter((product) => {
      const stock = Number(product.stock || 0);
      return stock > 0 && stock <= 10;
    }).length;
    const outOfStockProducts = products.filter(
      (product) => Number(product.stock || 0) <= 0
    ).length;
    const totalUnits = products.reduce(
      (sum, product) => sum + Number(product.stock || 0),
      0
    );
    const totalInventoryValue = products.reduce(
      (sum, product) =>
        sum + Number(product.price || 0) * Number(product.stock || 0),
      0
    );

    return {
      totalUsers,
      totalProducts,
      activeUsers,
      superusers,
      staffUsers,
      normalUsers,
      inStockProducts,
      lowStockProducts,
      outOfStockProducts,
      totalUnits,
      totalInventoryValue,
    };
  }, [products, users]);

  const topProducts = useMemo(
    () =>
      [...products]
        .sort((a, b) => Number(b.stock || 0) - Number(a.stock || 0))
        .slice(0, 5),
    [products]
  );

  const stockAlerts = useMemo(
    () =>
      [...products]
        .sort((a, b) => Number(a.stock || 0) - Number(b.stock || 0))
        .slice(0, 5),
    [products]
  );

  const recentUsers = useMemo(() => [...users].slice(-5).reverse(), [users]);

  const currency = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  });

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white shadow-xl">
        <div className="grid gap-8 px-6 py-7 lg:grid-cols-[1.4fr_0.9fr] lg:px-8">
          <div>
            <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-100">
              Admin Dashboard
            </div>
            <h1 className="mt-4 max-w-2xl text-3xl font-bold leading-tight md:text-4xl">
              Theo doi nguoi dung, san pham va ton kho tren cung mot man hinh.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 md:text-base">
              Dashboard nay lay du lieu tu API user va product cua du an, giup
              ban xem nhanh suc khoe he thong va cac muc can uu tien xu ly.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => navigate("/admin/users")}
                className="rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Quan ly nguoi dung
              </button>
              <button
                type="button"
                onClick={() => navigate("/admin/products")}
                className="rounded-2xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                Quan ly san pham
              </button>
              <button
                type="button"
                onClick={loadDashboard}
                className="rounded-2xl border border-white/20 bg-transparent px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
              >
                Lam moi du lieu
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
              <p className="text-sm text-slate-300">Tong gia tri ton kho</p>
              <h2 className="mt-3 text-2xl font-bold">
                {currency.format(metrics.totalInventoryValue)}
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                {metrics.totalUnits} don vi hang dang duoc quan ly.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
              <p className="text-sm text-slate-300">Canh bao hien tai</p>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-300">Het hang</span>
                  <span className="font-bold text-rose-300">
                    {metrics.outOfStockProducts}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-300">Sap het</span>
                  <span className="font-bold text-amber-300">
                    {metrics.lowStockProducts}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-300">Tai khoan admin</span>
                  <span className="font-bold text-blue-200">
                    {metrics.superusers + metrics.staffUsers}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {error && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
          {error}
        </div>
      )}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Tong nguoi dung"
          value={metrics.totalUsers}
          hint={`${metrics.activeUsers} tai khoan dang active`}
          tone="blue"
        />
        <StatCard
          title="Tong san pham"
          value={metrics.totalProducts}
          hint={`${metrics.inStockProducts} san pham con hang`}
          tone="emerald"
        />
        <StatCard
          title="San pham sap het"
          value={metrics.lowStockProducts}
          hint="Nhung san pham co stock tu 1 den 10"
          tone="amber"
        />
        <StatCard
          title="San pham het hang"
          value={metrics.outOfStockProducts}
          hint="Can uu tien cap nhat ton kho"
          tone="rose"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Tong quan he thong
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Cac ti le quan trong duoc tinh tu du lieu hien co.
                </p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                Live data
              </span>
            </div>

            <div className="mt-5 grid gap-4">
              <ProgressBlock
                label="Nguoi dung dang hoat dong"
                value={metrics.activeUsers}
                total={metrics.totalUsers}
                colorClass="bg-gradient-to-r from-blue-500 to-sky-400"
              />
              <ProgressBlock
                label="San pham con hang"
                value={metrics.inStockProducts}
                total={metrics.totalProducts}
                colorClass="bg-gradient-to-r from-emerald-500 to-lime-400"
              />
              <ProgressBlock
                label="Nguoi dung thuong"
                value={metrics.normalUsers}
                total={metrics.totalUsers}
                colorClass="bg-gradient-to-r from-violet-500 to-fuchsia-400"
              />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Canh bao ton kho
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Nhung san pham can kiem tra truoc.
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {loading ? (
                <p className="text-sm text-slate-500">Dang tai du lieu...</p>
              ) : stockAlerts.length === 0 ? (
                <p className="text-sm text-slate-500">Chua co san pham nao.</p>
              ) : (
                stockAlerts.map((product) => {
                  const stock = Number(product.stock || 0);
                  const badgeClass =
                    stock <= 0
                      ? "bg-rose-100 text-rose-700"
                      : stock <= 10
                        ? "bg-amber-100 text-amber-700"
                        : "bg-emerald-100 text-emerald-700";
                  const label =
                    stock <= 0 ? "Het hang" : stock <= 10 ? "Sap het" : "On dinh";

                  return (
                    <div
                      key={product.id}
                      className="flex flex-col gap-3 rounded-2xl border border-slate-100 p-4 md:flex-row md:items-center md:justify-between"
                    >
                      <div>
                        <p className="font-semibold text-slate-900">
                          {product.name}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          {currency.format(Number(product.price || 0))}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-slate-700">
                          Stock: {stock}
                        </span>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${badgeClass}`}
                        >
                          {label}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Phan bo vai tro</h2>
            <p className="mt-1 text-sm text-slate-500">
              Co cau nguoi dung hien tai trong he thong.
            </p>

            <div className="mt-5 space-y-3">
              {[
                {
                  label: "Superuser",
                  value: metrics.superusers,
                  color: "bg-rose-500",
                },
                {
                  label: "Staff",
                  value: metrics.staffUsers,
                  color: "bg-blue-500",
                },
                {
                  label: "User",
                  value: metrics.normalUsers,
                  color: "bg-slate-500",
                },
              ].map((item) => {
                const total = metrics.totalUsers || 1;
                const percent = Math.round((item.value / total) * 100);
                return (
                  <div key={item.label} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-slate-700">
                        {item.label}
                      </span>
                      <span className="text-slate-500">
                        {item.value} tai khoan
                      </span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full ${item.color}`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              Nguoi dung gan day
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Lay 5 tai khoan cuoi trong danh sach tra ve.
            </p>

            <div className="mt-5 space-y-3">
              {loading ? (
                <p className="text-sm text-slate-500">Dang tai du lieu...</p>
              ) : recentUsers.length === 0 ? (
                <p className="text-sm text-slate-500">Chua co nguoi dung nao.</p>
              ) : (
                recentUsers.map((user) => {
                  const roleLabel = user.is_superuser
                    ? "Superuser"
                    : user.is_staff
                      ? "Staff"
                      : "User";
                  const roleClass = user.is_superuser
                    ? "bg-rose-100 text-rose-700"
                    : user.is_staff
                      ? "bg-blue-100 text-blue-700"
                      : "bg-slate-100 text-slate-700";

                  return (
                    <div
                      key={user.user_id || user.id}
                      className="flex flex-col gap-3 rounded-2xl border border-slate-100 p-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="font-semibold text-slate-900">
                            {user.username}
                          </p>
                          <p className="text-sm text-slate-500">{user.email}</p>
                        </div>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${roleClass}`}
                        >
                          {roleLabel}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-slate-500">
                        <span>ID: {user.user_id || user.id}</span>
                        <span>{user.is_active ? "Active" : "Inactive"}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              San pham ton kho cao
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Nhung mat hang dang co so luong lon nhat.
            </p>

            <div className="mt-5 space-y-3">
              {loading ? (
                <p className="text-sm text-slate-500">Dang tai du lieu...</p>
              ) : topProducts.length === 0 ? (
                <p className="text-sm text-slate-500">Chua co san pham nao.</p>
              ) : (
                topProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-sm font-bold text-white">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">
                          {product.name}
                        </p>
                        <p className="text-sm text-slate-500">
                          {currency.format(Number(product.price || 0))}
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                      {Number(product.stock || 0)} sp
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
