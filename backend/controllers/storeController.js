import Store from "../models/Store.js";
import Rating from "../models/Rating.js";

// Get all stores
export const getStores = async (req, res) => {
  try {
    const stores = await Store.find()
      .populate("owner", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      stores
    });
  } catch (error) {
    console.error("Get stores error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch stores"
    });
  }
};

// Create store
export const createStore = async (req, res) => {
  try {
    const {
      name,
      email,
      address,
      owner
    } = req.body;

    if (!name || !email || !address) {
      return res.status(400).json({
        success: false,
        message: "Name, email and address are required"
      });
    }

    if (address.length > 400) {
      return res.status(400).json({
        success: false,
        message: "Address cannot exceed 400 characters"
      });
    }

    const store = await Store.create({
      name,
      email,
      address,
      owner: owner || null
    });

    res.status(201).json({
      success: true,
      message: "Store created successfully",
      store
    });
  } catch (error) {
    console.error("Create store error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create store"
    });
  }
};

// Get stores with average rating
export const getStoresWithRatings = async (req, res) => {
  try {
    const { search } = req.query;

    const filter = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { address: { $regex: search, $options: "i" } }
      ];
    }

    const stores = await Store.find(filter)
      .populate("owner", "name email")
      .sort({ createdAt: -1 })
      .lean();

    const storesWithRatings = await Promise.all(
      stores.map(async (store) => {
        const ratings = await Rating.find({
          store: store._id
        }).select("rating user");

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

        const myRating = ratings.find(
          (item) =>
            item.user.toString() === req.user.id.toString()
        );

        return {
          ...store,
          averageRating: Number(averageRating),
          totalRatings,
          myRating: myRating ? myRating.rating : null
        };
      })
    );

    res.json({
      success: true,
      count: storesWithRatings.length,
      stores: storesWithRatings
    });
  } catch (error) {
    console.error("Get stores with ratings error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch stores"
    });
  }
};

export const getStoreById = async (req, res) => {
  try {
    const store = await Store.findById(req.params.id)
      .populate("owner", "name email address");

    if (!store) {
      return res.status(404).json({
        success: false,
        message: "Store not found"
      });
    }

    const ratings = await Rating.find({
      store: store._id
    })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    const averageRating =
      ratings.length > 0
        ? (
            ratings.reduce(
              (sum, item) => sum + item.rating,
              0
            ) / ratings.length
          ).toFixed(1)
        : 0;

    res.json({
      success: true,
      store,
      stats: {
        totalRatings: ratings.length,
        averageRating: Number(averageRating)
      },
      ratings
    });
  } catch (error) {
    console.error("Store details error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch store details"
    });
  }
};