import Store from "../models/Store.js";
import Rating from "../models/Rating.js";

export const getOwnerDashboard = async (req, res) => {
  try {
    const stores = await Store.find({
      owner: req.user.id
    });

    if (!stores.length) {
      return res.json({
        success: true,
        stats: {
          stores: 0,
          averageRating: 0,
          totalRatings: 0
        },
        ratings: []
      });
    }

    const storeIds = stores.map((store) => store._id);

    const ratings = await Rating.find({
      store: { $in: storeIds }
    })
      .populate("user", "name email")
      .populate("store", "name")
      .sort({ createdAt: -1 });

    const totalRatings = ratings.length;

    const averageRating =
      totalRatings > 0
        ? (
            ratings.reduce(
              (sum, item) => sum + item.rating,
              0
            ) / totalRatings
          ).toFixed(1)
        : 0;

    res.json({
      success: true,
      stats: {
        stores: stores.length,
        averageRating: Number(averageRating),
        totalRatings
      },
      stores,
      ratings
    });
  } catch (error) {
    console.error("Owner dashboard error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch owner dashboard"
    });
  }
};

export const getOwnerRatings = async (req, res) => {
  try {
    const stores = await Store.find({
      owner: req.user.id
    }).select("_id");

    const storeIds = stores.map((store) => store._id);

    const ratings = await Rating.find({
      store: { $in: storeIds }
    })
      .populate("user", "name email")
      .populate("store", "name")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      ratings
    });
  } catch (error) {
    console.error("Owner ratings error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch ratings"
    });
  }
};