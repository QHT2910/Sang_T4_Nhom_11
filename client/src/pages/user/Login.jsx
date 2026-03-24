import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as loginRequest } from "../../services/authService.js";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await loginRequest({
        username: formData.username,
        password: formData.password,
      });

      if (res?.data?.token) {
        localStorage.setItem("token", res.data.token);
      }
      if (res?.data?.role) {
        localStorage.setItem("role", res.data.role);
      }
      if (res?.data?.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }

      const isSuperUser =
        res?.data?.user?.is_superuser || res?.data?.role === "superadmin";
      navigate(isSuperUser ? "/admin" : "/" );
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Login failed. Please try again.";
      setError(message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-shell">
        <div className="login-hero">
          <div className="login-badge">Welcome Back</div>
          <h2 className="login-title">Sign in to your space</h2>
          <p className="login-subtitle">
            Manage products, track updates, and keep everything in sync.
          </p>
          <div className="login-highlights">
            <div className="login-chip">Fast</div>
            <div className="login-chip">Secure</div>
            <div className="login-chip">Colorful</div>
          </div>
        </div>

        <div className="login-card">
          <div className="login-card-header">
            <h3>Login</h3>
            <p>Use your username and password to continue</p>
          </div>

          <form className="login-form" onSubmit={handleLogin}>
            <label className="login-label" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              className="login-input"
              type="text"
              name="username"
              placeholder="Your username"
              onChange={handleChange}
              required
            />

            <label className="login-label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              className="login-input"
              type="password"
              name="password"
              placeholder="Your password"
              onChange={handleChange}
              required
            />

            {error && <p className="login-error">{error}</p>}

            <button className="login-button" type="submit">
              Sign In
            </button>
            <p className="login-alt">
              Don&apos;t have an account?{" "}
              <Link className="login-link" to="/register">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
