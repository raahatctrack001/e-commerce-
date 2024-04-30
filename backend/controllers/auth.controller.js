import asyncHandler from "../utils/asyncHandler.js"; 
import sendToken from "../utils/sendToken.js";
import apiError from "../utils/apiError.js";
import User from "../models/user.models.js";


// Register user   =>  /api/v1/register
export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
  });

  sendToken(user, 201, res);
});

// Login user   =>  /api/v1/login
export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new apiError(404, "Please enter email & password");
  }

  // Find user in the database
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new apiError(401, "Invalid email or password");
  }

  // Check if password is correct
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    throw new apiError(401, "Invalid email or password");
  }

  sendToken(user, 200, res);
});

// Logout user   =>  /api/v1/logout
export const logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    message: "Logged Out",
  });
});