import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userApi from "../../services/userAdminService.js";
const emptyForm = {
  username: "",
  email: "",
  password: "",
  role: "user",
};

export default function AdminUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("role");
    const storedUser = (() => {
      try {
        return JSON.parse(localStorage.getItem("user"));
      } catch {
        return null;
      }
    })();
    const isAllowed =
      role === "superadmin" || storedUser?.is_superuser === true;
    if (!isAllowed) {
      navigate("/user");
      return;
    }
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await userApi.getUsers();
      setUsers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load users"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const startEdit = (user) => {
    setEditingId(user.user_id);
    setFormData({
      username: user.username || "",
      email: user.email || "",
      password: "",
      role: user.is_superuser ? "superadmin" : user.is_staff ? "admin" : "user",
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData(emptyForm);
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
        err?.response?.data?.message ||
          err?.message ||
          "Failed to save user"
      );
    }
  };

  const handleDelete = async (id) => {
    setError("");
    try {
      await userApi.deleteUser(id);
      loadUsers();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to delete user"
      );
    }
  };

  const normalizedQuery = query.trim().toLowerCase();
  const filteredUsers = users.filter((user) => {
    if (!normalizedQuery) return true;
    const name = String(user.username || "").toLowerCase();
    const email = String(user.email || "").toLowerCase();
    return name.includes(normalizedQuery) || email.includes(normalizedQuery);
  });

  const stats = {
    total: users.length,
    superusers: users.filter((u) => u.is_superuser).length,
    staff: users.filter((u) => u.is_staff).length,
    active: users.filter((u) => u.is_active).length,
  };

  return (
    <div className="admin-users admin-users-page">
      <div className="admin-hero">
        <div>
          <div className="admin-kicker">Admin Console</div>
          <h2>User Management</h2>
          <p>
            Create, update, and retire accounts. Superusers control access,
            staff handle operations.
          </p>
        </div>
        <div className="admin-actions">
          <div className="admin-search">
            <input
              className="admin-input admin-input-search"
              name="query"
              placeholder="Search username or email..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button className="admin-secondary" type="button" onClick={loadUsers}>
            Refresh
          </button>
        </div>
      </div>

      <div className="admin-stats">
        <div className="admin-stat">
          <div className="admin-stat-label">Total Users</div>
          <div className="admin-stat-value">{stats.total}</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat-label">Superusers</div>
          <div className="admin-stat-value">{stats.superusers}</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat-label">Staff</div>
          <div className="admin-stat-value">{stats.staff}</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat-label">Active</div>
          <div className="admin-stat-value">{stats.active}</div>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <h3>{editingId ? "Edit User" : "Create User"}</h3>
          <p>Passwords are only required when creating or resetting a user.</p>
        </div>
        <form className="admin-form" onSubmit={handleSubmit}>
          <input
            className="admin-input"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            className="admin-input"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            className="admin-input"
            name="password"
            placeholder={
              editingId
                ? "Leave blank to keep current password"
                : "Password (optional)"
            }
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <select
            className="admin-input"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="user">User</option>
            <option value="admin">Admin (staff)</option>
            <option value="superadmin">Superuser</option>
          </select>
          <div className="admin-form-actions">
            <button className="login-button" type="submit">
              {editingId ? "Update User" : "Create User"}
            </button>
            {editingId && (
              <button
                className="admin-secondary"
                type="button"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {error && <p className="login-error">{error}</p>}

      <div className="admin-table">
        <div className="admin-row admin-head">
          <span>ID</span>
          <span>Username</span>
          <span>Email</span>
          <span>Status</span>
          <span>Role</span>
          <span>Actions</span>
        </div>
        {loading ? (
          <div className="admin-empty">Loading users...</div>
        ) : filteredUsers.length === 0 ? (
          <div className="admin-empty">No users match this search.</div>
        ) : (
          filteredUsers.map((user, index) => (
            <div
              className="admin-row"
              key={user.user_id || user.id}
              style={{ animationDelay: `${index * 40}ms` }}
            >
              <span data-label="ID">{user.user_id || user.id}</span>
              <span data-label="Username">{user.username}</span>
              <span data-label="Email">{user.email}</span>
              <span data-label="Status">
                <span
                  className={`admin-pill ${
                    user.is_active ? "is-active" : "is-muted"
                  }`}
                >
                  {user.is_active ? "Active" : "Inactive"}
                </span>
              </span>
              <span data-label="Role">
                <span
                  className={`admin-pill ${
                    user.is_superuser ? "is-super" : user.is_staff ? "is-staff" : "is-user"
                  }`}
                >
                  {user.is_superuser
                    ? "Superuser"
                    : user.is_staff
                      ? "Staff"
                      : "User"}
                </span>
              </span>
              <span className="admin-row-actions" data-label="Actions">
                <button
                  className="admin-link"
                  type="button"
                  onClick={() => startEdit(user)}
                >
                  Edit
                </button>
                <button
                  className="admin-link danger"
                  type="button"
                  onClick={() => handleDelete(user.user_id || user.id)}
                >
                  Delete
                </button>
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
