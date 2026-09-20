import { useEffect, useState } from "react";
import {
  Search,
  Plus,
  Users,
  Eye,
  X,
  UserPlus
} from "lucide-react";

import api from "../../services/api";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "user"
  });

  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const params = {};

      if (search.trim()) {
        params.search = search.trim();
      }

      if (role) {
        params.role = role;
      }

      const response = await api.get("/admin/users", { params });

      setUsers(response.data.users || []);
    } catch (error) {
      console.error("Fetch users error:", error);

      setError(
        error.response?.data?.message ||
        "Unable to load users"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers();
    }, 300);

    return () => clearTimeout(timer);
  }, [search, role]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setFormError("");

      await api.post("/admin/users", form);

      setShowAddModal(false);

      setForm({
        name: "",
        email: "",
        password: "",
        address: "",
        role: "user"
      });

      fetchUsers();
    } catch (error) {
      console.error("Create user error:", error);

      setFormError(
        error.response?.data?.message ||
        "Unable to create user"
      );
    } finally {
      setSaving(false);
    }
  };

  const getRoleLabel = (role) => {
    if (role === "admin") return "Administrator";
    if (role === "owner") return "Store Owner";
    return "Normal User";
  };

  const getInitial = (name) => {
    return name?.charAt(0)?.toUpperCase() || "U";
  };

  return (
    <div className="manage-users-page">

      <div className="page-header-row">
        <div>
          <p className="eyebrow">USER MANAGEMENT</p>

          <h1>Manage Users</h1>

          <p>
            View and manage all registered users on the platform.
          </p>
        </div>

        <button
          className="primary-btn"
          onClick={() => {
            setFormError("");
            setShowAddModal(true);
          }}
        >
          <Plus size={18} />
          Add User
        </button>
      </div>

      <div className="users-toolbar">

        <div className="search-box">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search by name, email or address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="role-filter"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="user">Normal User</option>
          <option value="owner">Store Owner</option>
          <option value="admin">Administrator</option>
        </select>

      </div>

      <div className="users-card">

        <div className="users-card-header">
          <div>
            <h2>Registered Users</h2>
            <p>{users.length} users found</p>
          </div>

          <div className="users-count">
            <Users size={17} />
            {users.length}
          </div>
        </div>

        {loading ? (
          <div className="table-loading">
            <div className="loading-spinner"></div>
            <p>Loading users...</p>
          </div>
        ) : error ? (
          <div className="table-error">
            {error}
          </div>
        ) : users.length === 0 ? (
          <div className="empty-users">
            <Users size={38} />
            <h3>No users found</h3>
            <p>
              Try changing your search or filter.
            </p>
          </div>
        ) : (
          <div className="table-wrapper">

            <table className="users-table">

              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Role</th>
                  <th>Joined</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {users.map((user) => (
                  <tr key={user._id}>

                    <td>
                      <div className="user-cell">

                        <div className="user-avatar">
                          {getInitial(user.name)}
                        </div>

                        <div>
                          <strong>{user.name}</strong>
                          <span>ID: {user._id.slice(-6)}</span>
                        </div>

                      </div>
                    </td>

                    <td>{user.email}</td>

                    <td>
                      <div className="address-cell">
                        {user.address}
                      </div>
                    </td>

                    <td>
                      <span
                        className={`role-badge ${user.role}`}
                      >
                        {getRoleLabel(user.role)}
                      </span>
                    </td>

                    <td>
                      {new Date(
                        user.createdAt
                      ).toLocaleDateString("en-IN")}
                    </td>

                    <td>
                      <button
                        className="view-user-btn"
                        onClick={() =>
                          setSelectedUser(user)
                        }
                      >
                        <Eye size={16} />
                        View
                      </button>
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>

      {/* ADD USER MODAL */}

      {showAddModal && (
        <div className="modal-overlay">

          <div className="user-modal">

            <div className="modal-header">

              <div>
                <div className="modal-icon">
                  <UserPlus size={20} />
                </div>

                <h2>Add New User</h2>

                <p>
                  Create a new platform account.
                </p>
              </div>

              <button
                className="modal-close"
                onClick={() => setShowAddModal(false)}
              >
                <X size={20} />
              </button>

            </div>

            <form
              className="user-form"
              onSubmit={handleAddUser}
            >

              {formError && (
                <div className="form-error">
                  {formError}
                </div>
              )}

              <div className="form-group">
                <label>Full Name</label>

                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  minLength={20}
                  maxLength={60}
                  required
                />

                <small>
                  20–60 characters
                </small>
              </div>

              <div className="form-row">

                <div className="form-group">
                  <label>Email</label>

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Password</label>

                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="8–16 characters"
                    minLength={8}
                    maxLength={16}
                    required
                  />
                </div>

              </div>

              <div className="form-group">
                <label>Address</label>

                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Enter address"
                  maxLength={400}
                  rows={3}
                  required
                />
              </div>

              <div className="form-group">
                <label>Role</label>

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

                  <option value="admin">
                    Administrator
                  </option>
                </select>
              </div>

              <div className="modal-actions">

                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() =>
                    setShowAddModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-btn"
                  disabled={saving}
                >
                  {saving ? "Creating..." : "Create User"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* USER DETAILS MODAL */}

      {selectedUser && (
        <div className="modal-overlay">

          <div className="user-modal details-modal">

            <div className="modal-header">

              <div>
                <div className="modal-icon">
                  <Users size={20} />
                </div>

                <h2>User Details</h2>

                <p>
                  Account information
                </p>
              </div>

              <button
                className="modal-close"
                onClick={() =>
                  setSelectedUser(null)
                }
              >
                <X size={20} />
              </button>

            </div>

            <div className="user-details">

              <div className="detail-profile">

                <div className="large-avatar">
                  {getInitial(selectedUser.name)}
                </div>

                <div>
                  <h3>{selectedUser.name}</h3>

                  <span
                    className={`role-badge ${selectedUser.role}`}
                  >
                    {getRoleLabel(selectedUser.role)}
                  </span>
                </div>

              </div>

              <div className="detail-grid">

                <div>
                  <span>Email</span>
                  <strong>{selectedUser.email}</strong>
                </div>

                <div>
                  <span>Joined</span>
                  <strong>
                    {new Date(
                      selectedUser.createdAt
                    ).toLocaleDateString("en-IN")}
                  </strong>
                </div>

                <div className="detail-full">
                  <span>Address</span>
                  <strong>
                    {selectedUser.address}
                  </strong>
                </div>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default ManageUsers;