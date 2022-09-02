const asyncHandler = require("express-async-handler");
const User = require("../modals/userModels");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// @desc Register New User
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  // check user if exist
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create User
  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });
  if (user) {
    console.log("~ user", user)
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email
    });
  } else {
    res.status(400);
    throw new Error("Invalid User data");
  }
});

// @desc Authenticate a user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler((req, res) => {
  res.status(200).json({ message: "User Logged In successfully" });
});

// @desc Get User data
// @route GET /api/users/getme
// @access Public
const getUserData = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "User Data display" });
});

module.exports = {
  registerUser,
  loginUser,
  getUserData
};
