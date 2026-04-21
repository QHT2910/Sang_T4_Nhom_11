import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import userApi from "../../services/userAdminService.js";

const emptyForm = {
  username: "",
  email: "",
  password: "",
  role: "user",
};

const roleMeta = {
  user: {
    label: "Người dùng",
    chipClass: "bg-slate-100 text-slate-700",
  },
  admin: {
    label: "Staff",
    chipClass: "bg-blue-100 text-blue-700",
  },
  superadmin: {
    label: "Super Admin",
    chipClass: "bg-rose-100 text-rose-700",
  },
};

function getRole(user) {
  if (user.is_superuser) return "superadmin";
  if (user.is_staff) return "admin";
  return "user";
}

function getUserFormData(user) {
  return {
    username: user?.username || user?.name || "",
    email:
      user?.email ||
      user?.user_email ||
      user?.mail ||
      user?.account?.email ||
      "",
    password: "",
    role: getRole(user),
  };
}

function UserTable({
  title,
  description,
  users,
  onEdit,
  onDelete,
  canDeleteUser,
  emptyText,
}) {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <div className="flex flex-col gap-2 border-b border-slate-100 pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900">{title}</h3>
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        </div>
        <span className="inline-flex w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          {users.length} tài khoản
        </span>
      </div>

      <div className="mt-5 space-y-3">
        {users.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-center text-sm font-medium text-slate-500">
            {emptyText}
          </div>
        ) : (
          users.map((user) => {
            const role = getRole(user);
            const roleInfo = roleMeta[role];
            const canDelete = canDeleteUser ? canDeleteUser(user) : false;

            return (
              <div
                key={user.user_id || user.id}
                className="grid gap-4 rounded-3xl border border-slate-100 p-4 transition hover:-translate-y-0.5 hover:border-slate-200 hover:shadow-md lg:grid-cols-[1.4fr_1fr_auto]"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h4 className="text-lg font-semibold text-slate-900">
                      {user.username}
                    </h4>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${roleInfo.chipClass}`}
                    >
                      {roleInfo.label}
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        user.is_active
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {user.is_active ? "Dang hoat dong" : "Tam khoa"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-500">{user.email}</p>
                </div>

                <div className="grid gap-2 text-sm text-slate-500 sm:grid-cols-2 lg:grid-cols-1">
                  <div className="rounded-2xl bg-slate-50 px-4 py-3">
                    <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      ID
                    </span>
                    <span className="mt-1 block font-semibold text-slate-700">
                      {user.user_id || user.id}
                    </span>
                  </div>
                  <div className="rounded-2xl bg-slate-50 px-4 py-3">
                    <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Quyền hạn
                    </span>
                    <span className="mt-1 block font-semibold text-slate-700">
                      {role === "superadmin"
                        ? "Toàn quyền hệ thống"
                        : role === "admin"
                          ? "Vận hành & quản lý"
                          : "Khách hàng / tài khoản thường"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                  <button
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                    type="button"
                    onClick={() => onEdit(user)}
                  >
                    Chỉnh sửa
                  </button>
                  {onDelete && (
                    <button
                      className={`rounded-2xl px-4 py-2.5 text-sm font-semibold transition ${
                        canDelete
                          ? "bg-rose-50 text-rose-600 hover:bg-rose-100"
                          : "cursor-not-allowed bg-slate-100 text-slate-400"
                      }`}
                      type="button"
                      onClick={() => onDelete(user)}
                      disabled={!canDelete}
                      title={
                        canDelete
                          ? "Xóa tài khoản"
                          : role === "superadmin"
                            ? "Không thể xóa tài khoản superadmin"
                            : "Bạn không có quyền xóa tài khoản"
                      }
                    >
                      Xóa
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}

export default function AdminUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const formSectionRef = useRef(null);
  const storedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();
  const currentRole = storedUser?.is_superuser
    ? "superadmin"
    : storedUser?.is_staff || localStorage.getItem("role") === "admin"
      ? "admin"
      : localStorage.getItem("role") || "user";

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const isAllowed =
      role === "admin" ||
      role === "superadmin" ||
      storedUser?.is_staff === true ||
      storedUser?.is_superuser === true;

    if (!token) {
      navigate("/login");
      return;
    }

    if (!isAllowed) {
      navigate("/user");
      return;
    }

    loadUsers();
  }, [navigate]);

  const loadUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await userApi.getUsers();
      setUsers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError(
        err?.response?.data?.message || err?.message || "Failed to load users"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const startEdit = (user) => {
    setEditingId(user.user_id || user.id);
    setEditingUser(user);
    setFormData(getUserFormData(user));
    formSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setEditingUser(null);
    setFormData(emptyForm);
  };

  const canDeleteUser = (user) =>
    currentRole === "superadmin" && getRole(user) !== "superadmin";

  const handleDelete = async (user) => {
    if (!canDeleteUser(user)) {
      setError(
        getRole(user) === "superadmin"
          ? "Không thể xóa tài khoản superadmin."
          : "Bạn không có quyền xóa tài khoản."
      );
      return;
    }

    setError("");
    try {
      await userApi.deleteUser(user.user_id || user.id);
      if (editingId === (user.user_id || user.id)) {
        resetForm();
      }
      loadUsers();
    } catch (err) {
      setError(
        err?.response?.data?.message || err?.message || "Failed to delete user"
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const payload = {
        username: formData.username,
        email: formData.email,
        is_superuser: formData.role === "superadmin",
        is_staff: formData.role === "admin",
      };

      if (formData.password) {
        payload.password = formData.password;
      }

      if (editingId) {
        await userApi.updateUser(editingId, payload);
      } else {
        await userApi.createUser(payload);
      }

      resetForm();
      loadUsers();
    } catch (err) {
      setError(
        err?.response?.data?.message || err?.message || "Failed to save user"
      );
    }
  };

  const normalizedQuery = query.trim().toLowerCase();

  const filteredUsers = useMemo(
    () =>
      users.filter((user) => {
        const role = getRole(user);
        const matchesQuery =
          !normalizedQuery ||
          String(user.username || "").toLowerCase().includes(normalizedQuery) ||
          String(user.email || "").toLowerCase().includes(normalizedQuery);
        const matchesRole = roleFilter === "all" || role === roleFilter;
        return matchesQuery && matchesRole;
      }),
    [users, normalizedQuery, roleFilter]
  );

  const stats = useMemo(
    () => ({
      total: users.length,
      superusers: users.filter((u) => u.is_superuser).length,
      staff: users.filter((u) => u.is_staff && !u.is_superuser).length,
      standard: users.filter((u) => !u.is_staff && !u.is_superuser).length,
      active: users.filter((u) => u.is_active).length,
    }),
    [users]
  );

  const adminAccounts = filteredUsers.filter(
    (user) => user.is_staff || user.is_superuser
  );
  const userAccounts = filteredUsers.filter(
    (user) => !user.is_staff && !user.is_superuser
  );

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-orange-950 text-white shadow-xl">
        <div className="grid gap-8 px-6 py-7 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
          <div>
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-orange-100">
              Access Control
            </span>
            <h1 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
              Quản lý tài khoản
            </h1>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { label: "Tổng tài khoản", value: stats.total },
              { label: "Đang hoạt động", value: stats.active },
              { label: "Super Admin & staff", value: stats.superusers + stats.staff },
              { label: "Người dùng thường", value: stats.standard },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm"
              >
                <p className="text-sm text-slate-300">{item.label}</p>
                <p className="mt-3 text-3xl font-bold text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {error && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
          {error}
        </div>
      )}

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6">
          <div
            ref={formSectionRef}
            className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm md:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {editingId ? "Cập nhật tài khoản" : "Tạo tài khoản mới"}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Mật khẩu chỉ cần nhập khi tạo mới hoặc khi muốn reset.
                </p>
              </div>
              {editingId && (
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
                  Đang chỉnh sửa
                </span>
              )}
            </div>

            <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-700">Username</span>
              <input
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-400 focus:bg-white"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-700">Email</span>
              <input
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-400 focus:bg-white"
                name="email"
                placeholder="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-700">Mat khau</span>
              <input
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-400 focus:bg-white"
                name="password"
                placeholder={
                  editingId
                    ? "Để trống nếu không muốn thay đổi mật khẩu"
                    : "Nhập mật khẩu"
                }
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-700">Role</span>
              <select
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-400 focus:bg-white"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="user">Người dùng</option>
                <option value="admin">Staff</option>
                <option value="superadmin">Super Admin</option>
              </select>
              </label>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  className="rounded-2xl bg-gradient-to-r from-slate-900 to-slate-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-300 transition hover:-translate-y-0.5"
                  type="submit"
                >
                  {editingId ? "Lưu thay đổi" : "Tạo tài khoản"}
                </button>
                {editingId && (
                  <button
                    className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    type="button"
                    onClick={resetForm}
                  >
                    Hủy
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm md:p-6">
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Bộ lọc nhanh</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Tìm theo tên, email hoặc lọc theo nhóm quyền.
                </p>
              </div>

              <input
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-400 focus:bg-white"
                name="query"
                placeholder="Tìm username hoặc email..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

              <div className="flex flex-wrap gap-2">
                {[
                  { value: "all", label: "Tất cả" },
                  { value: "superadmin", label: "Super Admin" },
                  { value: "admin", label: "Staff" },
                  { value: "user", label: "Người dùng" },
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setRoleFilter(item.value)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      roleFilter === item.value
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <button
                className="w-fit rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                type="button"
                onClick={loadUsers}
              >
                {loading ? "Đang tải..." : "Làm mới dữ liệu"}
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              label: "Super Admin",
              value: stats.superusers,
              tone: "from-rose-500/15 to-pink-500/10 border-rose-200",
            },
            {
              label: "Staff",
              value: stats.staff,
              tone: "from-blue-500/15 to-sky-500/10 border-blue-200",
            },
            {
              label: "Người dùng",
              value: stats.standard,
              tone: "from-slate-500/15 to-slate-400/10 border-slate-200",
            },
            {
              label: "Kết quả hiện tại",
              value: filteredUsers.length,
              tone: "from-amber-500/15 to-orange-500/10 border-amber-200",
            },
          ].map((item) => (
            <div
              key={item.label}
              className={`rounded-[28px] border bg-gradient-to-br ${item.tone} p-5 shadow-sm`}
            >
              <p className="text-sm font-medium text-slate-500">{item.label}</p>
              <p className="mt-3 text-4xl font-bold text-slate-900">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-6 2xl:grid-cols-2">
        <UserTable
          title="Khu vực quản trị"
          description="Tài khoản có quyền, quản lý và cần được theo dõi chặt chẽ."
          users={adminAccounts}
          onEdit={startEdit}
          onDelete={currentRole === "superadmin" ? handleDelete : null}
          canDeleteUser={canDeleteUser}
          emptyText={
            loading ? "Đang tải danh sách quản trị..." : "Không có tài khoản admin phù hợp."
          }
        />
        <UserTable
          title="Khu vực người dùng"
          description="Danh sách tài khoản khách hàng và tài khoản thường trong hệ thống."
          users={userAccounts}
          onEdit={startEdit}
          onDelete={currentRole === "superadmin" ? handleDelete : null}
          canDeleteUser={canDeleteUser}
          emptyText={
            loading ? "Đang tải danh sách người dùng..." : "Không có người dùng phù hợp."
          }
        />
      </div>
    </div>
  );
}
