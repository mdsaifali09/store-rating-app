import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Star, Eye, EyeOff } from "lucide-react";

import api from "../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "user"
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setSuccess("");
      setLoading(true);

      await api.post("/auth/register", form);

      setSuccess("Account created successfully. Please login.");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-brand">
        <div className="brand-icon">
          <Star size={20} fill="currentColor" />
        </div>
        <span>RatePoint</span>
      </div>

      <div className="auth-card register-card">

        <div className="auth-header">
          <h1>Create account</h1>
          <p>
            Join RatePoint and share your experience
          </p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {success && (
          <div className="success-message">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Full name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              minLength={20}
              maxLength={60}
              required
            />

            <small>
              20–60 characters
            </small>
          </div>

          <div className="form-group">
            <label>Email address</label>

            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <div className="password-field">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="8–16 characters"
                value={form.password}
                onChange={handleChange}
                minLength={8}
                maxLength={16}
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>
          </div>

          <div className="form-group">
            <label>Address</label>

            <textarea
              name="address"
              placeholder="Enter your address"
              value={form.address}
              onChange={handleChange}
              maxLength={400}
              required
            />
          </div>

          <div className="form-group">
            <label>Account type</label>

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
            >
              <option value="user">
                Normal User
              </option>

              <option value="owner">
                Store Owner
              </option>
            </select>
          </div>

          <button
            className="primary-btn"
            disabled={loading}
          >
            {loading
              ? "Creating account..."
              : "Create account"}
          </button>

        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;