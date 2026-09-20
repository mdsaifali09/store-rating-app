import { Star } from "lucide-react";

const RatingStars = ({
  value = 0,
  onChange,
  readonly = false,
  size = 20
}) => {
  return (
    <div className="rating-stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`star-button ${
            star <= Math.round(value) ? "active" : ""
          }`}
          onClick={() => !readonly && onChange?.(star)}
          disabled={readonly}
          aria-label={`Rate ${star} out of 5`}
        >
          <Star
            size={size}
            fill={star <= Math.round(value) ? "currentColor" : "none"}
          />
        </button>
      ))}
    </div>
  );
};

export default RatingStars;