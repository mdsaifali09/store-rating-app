import { useEffect, useState } from "react";
import {
  Search,
  Plus,
  Store,
  Eye,
  X,
  Building2,
  UserRound
} from "lucide-react";

import api from "../../services/api";

const ManageStores = () => {
  const [stores, setStores] = useState([]);
  const [owners, setOwners] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    owner: ""
  });

  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const fetchStores = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/admin/stores", {
        params: search.trim()
          ? { search: search.trim() }
          : {}
      });

      setStores(response.data.stores || []);
    } catch (error) {
      console.error("Fetch stores error:", error);

      setError(
        error.response?.data?.message ||
        "Unable to load stores"
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchOwners = async () => {
    try {
      const response = await api.get("/admin/users", {
        params: {
          role: "owner"
        }
      });

      setOwners(response.data.users || []);
    } catch (error) {
      console.error("Fetch owners error:", error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchStores();
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    fetchOwners();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleAddStore = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setFormError("");

      await api.post("/admin/stores", {
        name: form.name,
        email: form.email,
        address: form.address,
        owner: form.owner || null
      });

      setShowAddModal(false);

      setForm({
        name: "",
        email: "",
        address: "",
        owner: ""
      });

      fetchStores();
    } catch (error) {
      console.error("Create store error:", error);

      setFormError(
        error.response?.data?.message ||
        "Unable to create store"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="manage-stores-page">

      {/* PAGE HEADER */}

      <div className="page-header-row">

        <div>
          <p className="eyebrow">STORE MANAGEMENT</p>

          <h1>Manage Stores</h1>

          <p>
            View and manage all stores registered on the platform.
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
          Add Store
        </button>

      </div>

      {/* SEARCH */}

      <div className="stores-toolbar">

        <div className="search-box">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search by store name, email or address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

      </div>

      {/* STORES CARD */}

      <div className="stores-card">

        <div className="stores-card-header">

          <div>
            <h2>Registered Stores</h2>

            <p>
              {stores.length} stores found
            </p>
          </div>

          <div className="stores-count">
            <Store size={17} />
            {stores.length}
          </div>

        </div>

        {loading ? (

          <div className="table-loading">

            <div className="loading-spinner"></div>

            <p>Loading stores...</p>

          </div>

        ) : error ? (

          <div className="table-error">
            {error}
          </div>

        ) : stores.length === 0 ? (

          <div className="empty-stores">

            <Store size={38} />

            <h3>No stores found</h3>

            <p>
              Try changing your search or add a new store.
            </p>

          </div>

        ) : (

          <div className="table-wrapper">

            <table className="stores-table">

              <thead>

                <tr>
                  <th>Store</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Owner</th>
                  <th>Joined</th>
                  <th>Action</th>
                </tr>

              </thead>

              <tbody>

                {stores.map((store) => (

                  <tr key={store._id}>

                    <td>

                      <div className="store-cell">

                        <div className="store-avatar">
                          <Building2 size={18} />
                        </div>

                        <div>
                          <strong>{store.name}</strong>

                          <span>
                            ID: {store._id.slice(-6)}
                          </span>
                        </div>

                      </div>

                    </td>

                    <td>
                      {store.email}
                    </td>

                    <td>

                      <div className="store-address-cell">
                        {store.address}
                      </div>

                    </td>

                    <td>

                      {store.owner ? (

                        <div className="owner-cell">

                          <div className="owner-mini-avatar">
                            {store.owner.name
                              ?.charAt(0)
                              ?.toUpperCase()}
                          </div>

                          <div>
                            <strong>
                              {store.owner.name}
                            </strong>

                            <span>
                              {store.owner.email}
                            </span>
                          </div>

                        </div>

                      ) : (

                        <span className="unassigned">
                          Not assigned
                        </span>

                      )}

                    </td>

                    <td>

                      {new Date(
                        store.createdAt
                      ).toLocaleDateString("en-IN")}

                    </td>

                    <td>

                      <button
                        className="view-store-btn"
                        onClick={() =>
                          setSelectedStore(store)
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

      {/* ADD STORE MODAL */}

      {showAddModal && (

        <div className="modal-overlay">

          <div className="store-modal">

            <div className="modal-header">

              <div>

                <div className="modal-icon">
                  <Building2 size={20} />
                </div>

                <h2>Add New Store</h2>

                <p>
                  Create a new store on the platform.
                </p>

              </div>

              <button
                className="modal-close"
                onClick={() =>
                  setShowAddModal(false)
                }
              >
                <X size={20} />
              </button>

            </div>

            <form
              className="store-form"
              onSubmit={handleAddStore}
            >

              {formError && (
                <div className="form-error">
                  {formError}
                </div>
              )}

              <div className="form-group">

                <label>Store Name</label>

                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter store name"
                  required
                />

              </div>

              <div className="form-group">

                <label>Store Email</label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="store@example.com"
                  required
                />

              </div>

              <div className="form-group">

                <label>Address</label>

                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Enter store address"
                  maxLength={400}
                  rows={3}
                  required
                />

                <small>
                  Maximum 400 characters
                </small>

              </div>

              <div className="form-group">

                <label>Assign Store Owner</label>

                <select
                  name="owner"
                  value={form.owner}
                  onChange={handleChange}
                >

                  <option value="">
                    No owner assigned
                  </option>

                  {owners.map((owner) => (

                    <option
                      key={owner._id}
                      value={owner._id}
                    >
                      {owner.name} — {owner.email}
                    </option>

                  ))}

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
                  {saving
                    ? "Creating..."
                    : "Create Store"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* STORE DETAILS MODAL */}

      {selectedStore && (

        <div className="modal-overlay">

          <div className="store-modal details-modal">

            <div className="modal-header">

              <div>

                <div className="modal-icon">
                  <Store size={20} />
                </div>

                <h2>Store Details</h2>

                <p>
                  Store information
                </p>

              </div>

              <button
                className="modal-close"
                onClick={() =>
                  setSelectedStore(null)
                }
              >
                <X size={20} />
              </button>

            </div>

            <div className="store-details">

              <div className="store-detail-profile">

                <div className="large-store-icon">
                  <Store size={22} />
                </div>

                <div>

                  <h3>
                    {selectedStore.name}
                  </h3>

                  <span className="store-status">
                    Active Store
                  </span>

                </div>

              </div>

              <div className="detail-grid">

                <div>

                  <span>Email</span>

                  <strong>
                    {selectedStore.email}
                  </strong>

                </div>

                <div>

                  <span>Joined</span>

                  <strong>
                    {new Date(
                      selectedStore.createdAt
                    ).toLocaleDateString("en-IN")}
                  </strong>

                </div>

                <div>

                  <span>Owner</span>

                  <strong>
                    {selectedStore.owner
                      ? selectedStore.owner.name
                      : "Not assigned"}
                  </strong>

                </div>

                <div className="detail-full">

                  <span>Address</span>

                  <strong>
                    {selectedStore.address}
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

export default ManageStores;