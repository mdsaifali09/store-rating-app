import { MapPin, Mail, Users } from "lucide-react";
import RatingStars from "./RatingStars";

const StoreCard = ({ store, onRate, submitting }) => {
  return (
    <div className="store-card">

      <div className="store-card-top">
        <div className="store-icon">
          {store.name?.charAt(0).toUpperCase()}
        </div>

        <div className="store-title">
          <h3>{store.name}</h3>

          <div className="store-rating-summary">
            <span className="average-rating">
              {store.averageRating || "0.0"}
            </span>

            <RatingStars
              value={store.averageRating}
              readonly
              size={17}
            />

            <span className="rating-count">
              ({store.totalRatings || 0})
            </span>
          </div>
        </div>
      </div>

      <div className="store-info">

        <div className="store-info-row">
          <Mail size={16} />
          <span>{store.email}</span>
        </div>

        <div className="store-info-row">
          <MapPin size={16} />
          <span>{store.address}</span>
        </div>

        <div className="store-info-row">
          <Users size={16} />
          <span>
            {store.totalRatings || 0}{" "}
            {store.totalRatings === 1 ? "rating" : "ratings"}
          </span>
        </div>

      </div>

      <div className="store-rate-section">

        <div>
          <p className="rate-label">
            {store.myRating
              ? "Your Rating"
              : "Rate this store"}
          </p>

          <RatingStars
            value={store.myRating || 0}
            onChange={(rating) => onRate(store._id, rating)}
            readonly={submitting}
            size={22}
          />
        </div>

        {submitting && (
          <span className="saving-text">
            Saving...
          </span>
        )}

      </div>

    </div>
  );
};

export default StoreCard;