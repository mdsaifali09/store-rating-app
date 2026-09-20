import {
  UserRound,
  Mail,
  MapPin,
  ShieldCheck
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  const firstLetter =
    user?.name?.charAt(0)?.toUpperCase() || "U";

  const roleLabel =
    user?.role === "admin"
      ? "Administrator"
      : user?.role === "owner"
        ? "Store Owner"
        : "Normal User";

  return (
    <div className="profile-page">

      <div className="profile-header">
        <div>
          <p className="eyebrow">ACCOUNT</p>

          <h1>My Profile</h1>

          <p>
            View your account information and role details.
          </p>
        </div>
      </div>

      <div className="profile-grid">

        {/* PROFILE CARD */}
        <div className="profile-card">

          <div className="profile-cover"></div>

          <div className="profile-main">

            <div className="profile-avatar">
              {firstLetter}
            </div>

            <div className="profile-identity">

              <h2>{user?.name}</h2>

              <span className={`profile-role ${user?.role}`}>
                {roleLabel}
              </span>

            </div>

          </div>

        </div>

        {/* INFORMATION CARD */}
        <div className="profile-info-card">

          <div className="profile-card-title">
            <div className="title-icon">
              <UserRound size={18} />
            </div>

            <div>
              <h2>Personal Information</h2>
              <p>Your registered account details</p>
            </div>
          </div>

          <div className="profile-details">

            <div className="profile-detail-item">

              <div className="detail-icon">
                <UserRound size={17} />
              </div>

              <div>
                <span>Full Name</span>
                <strong>{user?.name || "Not available"}</strong>
              </div>

            </div>

            <div className="profile-detail-item">

              <div className="detail-icon">
                <Mail size={17} />
              </div>

              <div>
                <span>Email Address</span>
                <strong>{user?.email || "Not available"}</strong>
              </div>

            </div>

            <div className="profile-detail-item">

              <div className="detail-icon">
                <MapPin size={17} />
              </div>

              <div>
                <span>Address</span>
                <strong>{user?.address || "Not available"}</strong>
              </div>

            </div>

            <div className="profile-detail-item">

              <div className="detail-icon">
                <ShieldCheck size={17} />
              </div>

              <div>
                <span>Account Role</span>
                <strong>{roleLabel}</strong>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;