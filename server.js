
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const User = require("./Models/User");
const auth = require("./Middleware/auth");

const app = express();

app.use(express.json());
app.use(cors());

// MongoDB Connection
console.log("Trying MongoDB Connection...");

mongoose
   mongoose.connect("mongodb://localhost:27017/task12db")
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.log("MongoDB Error:", err);
  });

// Home Route
app.get("/", (req, res) => {
  res.send("Middleware & Private Route Protection API");
});

// Signup Route
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      message: "User Registered Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      message: "Login Successful",
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Private Route
app.get("/profile", auth, (req, res) => {
  res.status(200).json({
    message: "Private Route Access Granted",
    user: req.user,
  });
});

// Server Start
const PORT = process.env.PORT || 5000;

// Private Route
app.get("/profile", auth, (req, res) => {
  res.status(200).json({
    message: "Private Route Access Granted",
    user: req.user,
  });
});

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});