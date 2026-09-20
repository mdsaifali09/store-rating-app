import User from "../models/User.js";
import Store from "../models/Store.js";
import Rating from "../models/Rating.js";
import bcrypt from "bcryptjs";

/* =====================================================
   ADMIN DASHBOARD
===================================================== */

export const getDashboardStats = async (req, res) => {
  try {
    const users = await User.countDocuments({
      role: "user"
    });

    const owners = await User.countDocuments({
      role: "owner"
    });

    const stores = await Store.countDocuments();

    const ratings = await Rating.countDocuments();

    res.status(200).json({
      success: true,
      stats: {
        users,
        owners,
        stores,
        ratings
      }
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard stats"
    });
  }
};


/* =====================================================
   GET ALL USERS
===================================================== */

export const getUsers = async (req, res) => {
  try {
    const { search, role } = req.query;

    const filter = {};

    if (role) {
      filter.role = role;
    }

    if (search && search.trim()) {
      const searchValue = search.trim();

      filter.$or = [
        {
          name: {
            $regex: searchValue,
            $options: "i"
          }
        },
        {
          email: {
            $regex: searchValue,
            $options: "i"
          }
        },
        {
          address: {
            $regex: searchValue,
            $options: "i"
          }
        }
      ];
    }

    const users = await User.find(filter)
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    console.error("Get users error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch users"
    });
  }
};


/* =====================================================
   GET USER BY ID
===================================================== */

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.error("Get user error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch user"
    });
  }
};


/* =====================================================
   CREATE USER
===================================================== */

export const createUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      address,
      role
    } = req.body;

    /* ---------- REQUIRED FIELDS ---------- */

    if (
      !name ||
      !email ||
      !password ||
      !address ||
      !role
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    /* ---------- NAME VALIDATION ---------- */

    if (name.trim().length < 20 || name.trim().length > 60) {
      return res.status(400).json({
        success: false,
        message: "Name must be between 20 and 60 characters"
      });
    }

    /* ---------- EMAIL VALIDATION ---------- */

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address"
      });
    }

    /* ---------- ADDRESS VALIDATION ---------- */

    if (address.trim().length > 400) {
      return res.status(400).json({
        success: false,
        message: "Address cannot exceed 400 characters"
      });
    }

    /* ---------- PASSWORD VALIDATION ---------- */

    if (password.length < 8 || password.length > 16) {
      return res.status(400).json({
        success: false,
        message: "Password must be between 8 and 16 characters"
      });
    }

    /* ---------- ROLE VALIDATION ---------- */

    if (
      !["user", "owner", "admin"].includes(role)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid role"
      });
    }

    /* ---------- CHECK EXISTING USER ---------- */

    const normalizedEmail =
      email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered"
      });
    }

    /* ---------- HASH PASSWORD ---------- */

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    /* ---------- CREATE USER ---------- */

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      address: address.trim(),
      role
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Create user error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create user"
    });
  }
};


/* =====================================================
   GET ALL STORES
===================================================== */

export const getStores = async (req, res) => {
  try {
    const { search } = req.query;

    const filter = {};

    if (search && search.trim()) {
      const searchValue = search.trim();

      filter.$or = [
        {
          name: {
            $regex: searchValue,
            $options: "i"
          }
        },
        {
          email: {
            $regex: searchValue,
            $options: "i"
          }
        },
        {
          address: {
            $regex: searchValue,
            $options: "i"
          }
        }
      ];
    }

    const stores = await Store.find(filter)
      .populate("owner", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: stores.length,
      stores
    });
  } catch (error) {
    console.error(
      "Get admin stores error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch stores"
    });
  }
};


/* =====================================================
   CREATE STORE
===================================================== */

export const createStore = async (req, res) => {
  try {
    const {
      name,
      email,
      address,
      owner
    } = req.body;

    /* ---------- REQUIRED FIELDS ---------- */

    if (!name || !email || !address) {
      return res.status(400).json({
        success: false,
        message:
          "Name, email and address are required"
      });
    }

    /* ---------- STORE NAME ---------- */

    if (!name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Store name cannot be empty"
      });
    }

    /* ---------- EMAIL ---------- */

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address"
      });
    }

    /* ---------- ADDRESS ---------- */

    if (address.trim().length > 400) {
      return res.status(400).json({
        success: false,
        message:
          "Address cannot exceed 400 characters"
      });
    }

    /* ---------- OWNER VALIDATION ---------- */

    if (owner) {
      const ownerUser = await User.findOne({
        _id: owner,
        role: "owner"
      });

      if (!ownerUser) {
        return res.status(400).json({
          success: false,
          message: "Invalid store owner"
        });
      }
    }

    /* ---------- CREATE STORE ---------- */

    const store = await Store.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      address: address.trim(),
      owner: owner || null
    });

    /* ---------- RETURN POPULATED STORE ---------- */

    const createdStore = await Store.findById(
      store._id
    ).populate("owner", "name email");

    res.status(201).json({
      success: true,
      message: "Store created successfully",
      store: createdStore
    });
  } catch (error) {
    console.error(
      "Create admin store error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to create store"
    });
  }
};