import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register as registerRequest } from "../../services/authService.js";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await registerRequest({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      navigate("/login");
    } catch (err) {
      const message =
        err?.response?.data?.message || "Register failed. Please try again.";
      setError(message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-shell">
        <div className="login-hero">
          <div className="login-badge">Start Here</div>
          <h2 className="login-title">Create your account</h2>
          <p className="login-subtitle">
            Join the workspace and unlock all the features.
          </p>
          <div className="login-highlights">
            <div className="login-chip">Simple</div>
            <div className="login-chip">Fast</div>
            <div className="login-chip">Secure</div>
          </div>
        </div>

        <div className="login-card">
          <div className="login-card-header">
            <h3>Register</h3>
            <p>Fill in your details to get started</p>
          </div>

          <form className="login-form" onSubmit={handleRegister}>
            <label className="login-label" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              className="login-input"
              type="text"
              name="username"
              placeholder="Pick a username"
              onChange={handleChange}
              required
            />

            <label className="login-label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              className="login-input"
              type="email"
              name="email"
              placeholder="you@example.com"
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
              placeholder="Create a password"
              onChange={handleChange}
              required
            />

            {error && <p className="login-error">{error}</p>}

            <button className="login-button" type="submit">
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
