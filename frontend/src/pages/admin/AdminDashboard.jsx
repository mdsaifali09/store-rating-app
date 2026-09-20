import { useEffect, useState } from "react";
import {
  Users,
  Store,
  Star,
  UserCheck,
  ArrowRight,
  ShieldCheck
} from "lucide-react";

import { Link } from "react-router-dom";
import api from "../../services/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    stores: 0,
    ratings: 0,
    owners: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/admin/dashboard");

      console.log("Admin dashboard response:", response.data);

      const data = response.data.stats || response.data;

      setStats({
        users: data.users ?? data.totalUsers ?? 0,
        stores: data.stores ?? data.totalStores ?? 0,
        ratings: data.ratings ?? data.totalRatings ?? 0,
        owners: data.owners ?? data.totalOwners ?? 0
      });

    } catch (error) {
      console.error(
        "Admin dashboard error:",
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.message ||
        "Unable to load dashboard"
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-error">
        {error}
      </div>
    );
  }

  return (
    <div className="admin-dashboard">

      <div className="page-header">
        <div>
          <p className="eyebrow">ADMINISTRATION</p>
          <h1>Admin Dashboard</h1>
          <p>
            Monitor users, stores and platform activity.
          </p>
        </div>

        <div className="admin-badge">
          <ShieldCheck size={18} />
          Administrator
        </div>
      </div>

      <div className="admin-stats-grid">

        <div className="admin-stat-card">
          <div className="admin-stat-icon users">
            <Users size={21} />
          </div>

          <div>
            <span>Total Users</span>
            <strong>{stats.users}</strong>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon stores">
            <Store size={21} />
          </div>

          <div>
            <span>Total Stores</span>
            <strong>{stats.stores}</strong>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon ratings">
            <Star size={21} />
          </div>

          <div>
            <span>Total Ratings</span>
            <strong>{stats.ratings}</strong>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon owners">
            <UserCheck size={21} />
          </div>

          <div>
            <span>Store Owners</span>
            <strong>{stats.owners}</strong>
          </div>
        </div>

      </div>

      <div className="admin-actions-grid">

        <Link
          to="/admin/users"
          className="admin-action-card"
        >
          <div className="admin-action-icon">
            <Users size={20} />
          </div>

          <div>
            <h3>Manage Users</h3>
            <p>
              View, search and add platform users.
            </p>
          </div>

          <ArrowRight size={18} />
        </Link>

        <Link
          to="/admin/stores"
          className="admin-action-card"
        >
          <div className="admin-action-icon">
            <Store size={20} />
          </div>

          <div>
            <h3>Manage Stores</h3>
            <p>
              View and create stores on the platform.
            </p>
          </div>

          <ArrowRight size={18} />
        </Link>

      </div>

    </div>
  );
};

export default AdminDashboard;