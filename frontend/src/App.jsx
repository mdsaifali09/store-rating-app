import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

// Auth Pages
import Login from "./pages/Login";
import Register from "./pages/Register";

// User Pages
import Dashboard from "./pages/Dashboard";
import Stores from "./pages/Stores";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageStores from "./pages/admin/ManageStores";

// Owner Pages
import OwnerDashboard from "./pages/owner/OwnerDashboard";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          {/* Default Route */}
          <Route
            path="/"
            element={<Navigate to="/login" replace />}
          />

          {/* Public Routes */}
          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            
            {/* Layout = Sidebar + Navbar */}
            <Route element={<Layout />}>

              {/* User */}
              <Route
                path="/dashboard"
                element={<Dashboard />}
              />

              <Route
                path="/stores"
                element={<Stores />}
              />

              <Route
                path="/profile"
                element={<Profile />}
              />

              <Route
                path="/change-password"
                element={<ChangePassword />}
              />

              {/* Admin */}
              <Route
                path="/admin"
                element={<AdminDashboard />}
              />

              <Route
                path="/admin/users"
                element={<ManageUsers />}
              />

              <Route
                path="/admin/stores"
                element={<ManageStores />}
              />

              {/* Store Owner */}
              <Route
                path="/owner"
                element={<OwnerDashboard />}
              />

            </Route>
          </Route>

          {/* Unknown Route */}
          <Route
            path="*"
            element={<Navigate to="/login" replace />}
          />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;