import { Bell } from "lucide-react";

import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();

  const firstLetter =
    user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <header className="top-navbar">

      <div>
        <p className="navbar-greeting">
          Welcome back
        </p>

        <h2>
          {user?.name}
        </h2>
      </div>

      <div className="navbar-actions">

        <button className="icon-btn">
          <Bell size={19} />
        </button>

        <div className="navbar-profile">

          <div className="avatar">
            {firstLetter}
          </div>

          <div className="navbar-user-info">
            <strong>
              {user?.name}
            </strong>

            <span>
              {user?.role === "owner"
                ? "Store Owner"
                : user?.role === "admin"
                  ? "Administrator"
                  : "Normal User"}
            </span>
          </div>

        </div>

      </div>

    </header>
  );
};

export default Navbar;