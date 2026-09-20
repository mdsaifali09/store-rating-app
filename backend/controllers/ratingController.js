import Rating from "../models/Rating.js";

export const addOrUpdateRating = async (req, res) => {
  try {
    const { storeId, rating } = req.body;

    if (!storeId || rating === undefined) {
      return res.status(400).json({
        success: false,
        message: "Store ID and rating are required"
      });
    }

    const numericRating = Number(rating);

    if (
      !Number.isInteger(numericRating) ||
      numericRating < 1 ||
      numericRating > 5
    ) {
      return res.status(400).json({
        success: false,
        message: "Rating must be an integer between 1 and 5"
      });
    }

    const existingRating = await Rating.findOne({
      user: req.user.id,
      store: storeId
    });

    if (existingRating) {
      existingRating.rating = numericRating;

      await existingRating.save();

      return res.json({
        success: true,
        message: "Rating updated successfully",
        rating: existingRating
      });
    }

    const newRating = await Rating.create({
      user: req.user.id,
      store: storeId,
      rating: numericRating
    });

    res.status(201).json({
      success: true,
      message: "Rating submitted successfully",
      rating: newRating
    });
  } catch (error) {
    console.error("Rating error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to submit rating"
    });
  }
};

export const getMyRatings = async (req, res) => {
  try {
    const ratings = await Rating.find({
      user: req.user.id
    })
      .populate("store", "name email address")
      .sort({ updatedAt: -1 });

    res.json({
      success: true,
      ratings
    });
  } catch (error) {
    console.error("My ratings error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch ratings"
    });
  }
};