import { useEffect, useState } from "react";
import {
  Store,
  Star,
  Users,
  TrendingUp,
  MapPin,
  Mail
} from "lucide-react";

import api from "../../services/api";
import RatingStars from "../../components/RatingStars";

const OwnerDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/owner/dashboard");

      setData(response.data);
    } catch (error) {
      console.error("Owner dashboard error:", error);

      setError(
        error.response?.data?.message ||
        "Unable to load dashboard"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="owner-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="owner-error">
        {error}
      </div>
    );
  }

  const stores = data?.stores || [];

  const totalRatings = data?.totalRatings || 0;
  const averageRating = data?.averageRating || 0;

  return (
    <div className="owner-dashboard">

      {/* Header */}
      <div className="owner-header">
        <div>
          <p className="eyebrow">STORE OWNER</p>

          <h1>Owner Dashboard</h1>

          <p>
            Keep track of your stores and customer ratings.
          </p>
        </div>

        <div className="owner-header-icon">
          <Store size={25} />
        </div>
      </div>

      {/* Stats */}
      <div className="owner-stats">

        <div className="owner-stat-card">
          <div className="owner-stat-icon blue">
            <Store size={20} />
          </div>

          <div>
            <p>Total Stores</p>
            <h2>{stores.length}</h2>
          </div>
        </div>

        <div className="owner-stat-card">
          <div className="owner-stat-icon yellow">
            <Star size={20} />
          </div>

          <div>
            <p>Average Rating</p>
            <h2>{Number(averageRating).toFixed(1)}</h2>
          </div>
        </div>

        <div className="owner-stat-card">
          <div className="owner-stat-icon green">
            <Users size={20} />
          </div>

          <div>
            <p>Total Ratings</p>
            <h2>{totalRatings}</h2>
          </div>
        </div>

        <div className="owner-stat-card">
          <div className="owner-stat-icon purple">
            <TrendingUp size={20} />
          </div>

          <div>
            <p>Customer Activity</p>
            <h2>
              {totalRatings > 0 ? "Active" : "New"}
            </h2>
          </div>
        </div>

      </div>

      {/* Store Section */}
      <div className="owner-section">

        <div className="owner-section-header">
          <div>
            <h2>Your Stores</h2>
            <p>
              Overview of ratings received by your stores.
            </p>
          </div>
        </div>

        {stores.length === 0 ? (
          <div className="owner-empty">

            <div className="owner-empty-icon">
              <Store size={28} />
            </div>

            <h3>No store assigned</h3>

            <p>
              Your store information will appear here once
              an administrator assigns a store to you.
            </p>

          </div>
        ) : (
          <div className="owner-store-grid">

            {stores.map((store) => (
              <div
                className="owner-store-card"
                key={store._id}
              >

                <div className="owner-store-top">

                  <div className="owner-store-icon">
                    {store.name?.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <h3>{store.name}</h3>

                    <div className="owner-store-rating">
                      <RatingStars
                        value={store.averageRating || 0}
                        readonly
                        size={17}
                      />

                      <span>
                        {Number(
                          store.averageRating || 0
                        ).toFixed(1)}
                      </span>
                    </div>
                  </div>

                </div>

                <div className="owner-store-info">

                  <div>
                    <Mail size={15} />
                    <span>{store.email}</span>
                  </div>

                  <div>
                    <MapPin size={15} />
                    <span>{store.address}</span>
                  </div>

                </div>

                <div className="owner-store-footer">

                  <span>
                    {store.totalRatings || 0} ratings
                  </span>

                  <span className="rating-label">
                    Average:{" "}
                    {Number(
                      store.averageRating || 0
                    ).toFixed(1)}
                  </span>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
};

export default OwnerDashboard;