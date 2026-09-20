import { useState } from "react";
import {
  LockKeyhole,
  Eye,
  EyeOff,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";

import api from "../services/api";

const ChangePassword = () => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (form.newPassword !== form.confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    if (
      form.newPassword.length < 8 ||
      form.newPassword.length > 16
    ) {
      setError("New password must be between 8 and 16 characters.");
      return;
    }

    if (form.currentPassword === form.newPassword) {
      setError(
        "New password should be different from your current password."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await api.put(
        "/users/change-password",
        {
          currentPassword: form.currentPassword,
          newPassword: form.newPassword
        }
      );

      setSuccess(
        response.data.message ||
        "Password changed successfully."
      );

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });

    } catch (error) {
      console.error("Change password error:", error);

      setError(
        error.response?.data?.message ||
        "Unable to change password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="change-password-page">

      <div className="change-password-header">
        <div>
          <p className="eyebrow">SECURITY</p>

          <h1>Change Password</h1>

          <p>
            Update your password to keep your account secure.
          </p>
        </div>
      </div>

      <div className="password-layout">

        {/* FORM CARD */}

        <div className="password-card">

          <div className="password-card-header">

            <div className="password-icon">
              <LockKeyhole size={21} />
            </div>

            <div>
              <h2>Update your password</h2>
              <p>
                Enter your current password and choose a new one.
              </p>
            </div>

          </div>

          <form
            className="password-form"
            onSubmit={handleSubmit}
          >

            {error && (
              <div className="password-alert error">
                {error}
              </div>
            )}

            {success && (
              <div className="password-alert success">
                <CheckCircle2 size={17} />
                <span>{success}</span>
              </div>
            )}

            {/* CURRENT PASSWORD */}

            <div className="password-field">

              <label>Current Password</label>

              <div className="password-input-wrapper">

                <LockKeyhole size={17} />

                <input
                  type={showCurrent ? "text" : "password"}
                  name="currentPassword"
                  value={form.currentPassword}
                  onChange={handleChange}
                  placeholder="Enter current password"
                  required
                />

                <button
                  type="button"
                  className="password-eye"
                  onClick={() =>
                    setShowCurrent(!showCurrent)
                  }
                >
                  {showCurrent ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>

              </div>

            </div>

            {/* NEW PASSWORD */}

            <div className="password-field">

              <label>New Password</label>

              <div className="password-input-wrapper">

                <LockKeyhole size={17} />

                <input
                  type={showNew ? "text" : "password"}
                  name="newPassword"
                  value={form.newPassword}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  minLength={8}
                  maxLength={16}
                  required
                />

                <button
                  type="button"
                  className="password-eye"
                  onClick={() =>
                    setShowNew(!showNew)
                  }
                >
                  {showNew ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>

              </div>

              <small>
                Password must be 8–16 characters.
              </small>

            </div>

            {/* CONFIRM PASSWORD */}

            <div className="password-field">

              <label>Confirm New Password</label>

              <div className="password-input-wrapper">

                <LockKeyhole size={17} />

                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm new password"
                  minLength={8}
                  maxLength={16}
                  required
                />

                <button
                  type="button"
                  className="password-eye"
                  onClick={() =>
                    setShowConfirm(!showConfirm)
                  }
                >
                  {showConfirm ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>

              </div>

            </div>

            <button
              type="submit"
              className="change-password-btn"
              disabled={loading}
            >
              <ShieldCheck size={18} />

              {loading
                ? "Updating..."
                : "Update Password"}
            </button>

          </form>

        </div>

        {/* SECURITY INFO */}

        <div className="security-card">

          <div className="security-card-icon">
            <ShieldCheck size={22} />
          </div>

          <h2>Keep your account secure</h2>

          <p>
            Use a strong password that you don't reuse
            on other websites.
          </p>

          <div className="security-rules">

            <div>
              <CheckCircle2 size={16} />
              <span>8–16 characters</span>
            </div>

            <div>
              <CheckCircle2 size={16} />
              <span>Don't reuse old passwords</span>
            </div>

            <div>
              <CheckCircle2 size={16} />
              <span>Keep your password private</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ChangePassword;