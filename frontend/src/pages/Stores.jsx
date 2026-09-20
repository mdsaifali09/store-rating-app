import { useEffect, useState } from "react";
import { Search, Store as StoreIcon } from "lucide-react";

import api from "../services/api";
import StoreCard from "../components/StoreCard";

const Stores = () => {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [submittingId, setSubmittingId] = useState(null);

  const fetchStores = async (searchValue = "") => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/stores/ratings", {
        params: {
          search: searchValue
        }
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

  useEffect(() => {
    fetchStores();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchStores(search);
  };

  const handleRating = async (storeId, rating) => {
    try {
      setSubmittingId(storeId);
      setError("");

      await api.post("/ratings", {
        storeId,
        rating
      });

      await fetchStores(search);

    } catch (error) {
      console.error("Rating error:", error);

      setError(
        error.response?.data?.message ||
        "Unable to submit rating"
      );
    } finally {
      setSubmittingId(null);
    }
  };

  return (
    <div className="stores-page">

      {/* Page Header */}
      <div className="page-heading">

        <div>
          <p className="eyebrow">STORE DIRECTORY</p>

          <h1>Find a Store</h1>

          <p className="page-description">
            Explore stores and share your experience with a rating.
          </p>
        </div>

        <div className="heading-icon">
          <StoreIcon size={25} />
        </div>

      </div>

      {/* Search */}
      <form
        className="store-search"
        onSubmit={handleSearch}
      >
        <div className="search-input-wrapper">

          <Search size={19} />

          <input
            type="text"
            placeholder="Search by store name or address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <button
          type="submit"
          className="search-button"
        >
          Search
        </button>
      </form>

      {/* Error */}
      {error && (
        <div className="page-error">
          {error}
        </div>
      )}

      {/* Store Count */}
      {!loading && !error && (
        <div className="store-results-info">
          <span>
            {stores.length}{" "}
            {stores.length === 1 ? "store" : "stores"} found
          </span>
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="stores-loading">
          <div className="loading-spinner"></div>
          <p>Loading stores...</p>
        </div>
      ) : stores.length === 0 ? (
        <div className="empty-stores">

          <div className="empty-icon">
            <StoreIcon size={28} />
          </div>

          <h3>No stores found</h3>

          <p>
            Try searching with a different store name or address.
          </p>

        </div>
      ) : (
        <div className="store-grid">

          {stores.map((store) => (
            <StoreCard
              key={store._id}
              store={store}
              onRate={handleRating}
              submitting={submittingId === store._id}
            />
          ))}

        </div>
      )}

    </div>
  );
};

export default Stores;