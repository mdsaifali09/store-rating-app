import {
  LayoutDashboard,
  Store,
  UserRound,
  LockKeyhole,
  Users,
  LogOut,
  Star,
  BarChart3
} from "lucide-react";

import { NavLink } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { user, logout } = useAuth();

  const isAdmin = user?.role === "admin";
  const isOwner = user?.role === "owner";

  const userLinks = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard
    },
    {
      label: "Stores",
      path: "/stores",
      icon: Store
    },
    {
      label: "Profile",
      path: "/profile",
      icon: UserRound
    },
    {
      label: "Change Password",
      path: "/change-password",
      icon: LockKeyhole
    }
  ];

  const adminLinks = [
    {
      label: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard
    },
    {
      label: "Users",
      path: "/admin/users",
      icon: Users
    },
    {
      label: "Stores",
      path: "/admin/stores",
      icon: Store
    },
    {
      label: "Profile",
      path: "/profile",
      icon: UserRound
    },
    {
      label: "Change Password",
      path: "/change-password",
      icon: LockKeyhole
    }
  ];

  const ownerLinks = [
    {
      label: "Dashboard",
      path: "/owner",
      icon: BarChart3
    },
    {
      label: "Profile",
      path: "/profile",
      icon: UserRound
    },
    {
      label: "Change Password",
      path: "/change-password",
      icon: LockKeyhole
    }
  ];

  const links = isAdmin
    ? adminLinks
    : isOwner
      ? ownerLinks
      : userLinks;

  return (
    <aside className="sidebar">

      {/* BRAND */}

      <div className="sidebar-brand">

        <div className="brand-icon">
          <Star
            size={19}
            fill="currentColor"
          />
        </div>

        <span>RatePoint</span>

      </div>

      {/* ROLE */}

      <div className="sidebar-role">
        {isAdmin
          ? "Administrator"
          : isOwner
            ? "Store Owner"
            : "Customer"}
      </div>

      {/* NAVIGATION */}

      <nav className="sidebar-nav">

        {links.map((item) => {

          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${
                  isActive ? "active" : ""
                }`
              }
            >
              <Icon size={19} />

              <span>{item.label}</span>
            </NavLink>
          );

        })}

      </nav>

      {/* LOGOUT */}

      <button
        className="logout-btn"
        onClick={logout}
      >
        <LogOut size={18} />

        <span>Logout</span>
      </button>

    </aside>
  );
};

export default Sidebar;