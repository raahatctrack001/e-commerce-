import asyncHandler from "../utils/asyncHandler.js"; 
import sendToken from "../utils/sendToken.js";
import apiError from "../utils/apiError.js";
import User from "../models/user.models.js";
import apiResponse from "../utils/apiResponse.js";
import { getResetPasswordTemplate } from "../utils/emailTemplate.js";
import sendEmail from "../utils/sendEmail.js";


// Register user   =>  /api/v1/register
export const registerUser = asyncHandler(async (req, res, next) => {
  // console.log(req.body)
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
  console.log(req.user);
  if(!req.user)
    throw new apiError(400, "Unauthorized or token expired")
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json(
    new apiResponse(200, "user logged out")
  )
});

// Forgot password   =>  /api/v1/password/forgot
export const forgotPassword = asyncHandler(async (req, res, next) => {
  // Find user in the database
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    throw new apiError(404, "User not found with this email");
  }

  // Get reset password token
  const resetToken = user.getResetPasswordToken();

  await user.save();

  // Create reset password url
  const resetUrl = `${process.env.FRONTEND_URL}/api/v1/password/reset/${resetToken}`;

  const message = getResetPasswordTemplate(user?.name, resetUrl);

  try {
    await sendEmail({
      email: user.email,
      subject: "ShopIT Password Recovery",
      message,
    });

    res.status(200).json({
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    return next(new apiError(404, error?.message))
  }
});

export const resetPassword = asyncHandler(async (req, res, next) => {
  // Hash the URL Token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Password reset token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords does not match", 400));
  }

  // Set the new password
  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// Get current user profile  =>  /api/v1/me
export const getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req?.user?._id);

  res.status(200).json(
    new apiResponse(200, "user found!", user)
  )
});

// Update Password  =>  /api/v1/password/update
export const updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req?.user?._id).select("+password");

  // Check the previous user password
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    throw new apiError(404, "password didn't match")
  }

  user.password = req.body.password;
  user.save();

  res.status(200).json(
    new apiResponse(200, "password updated")
  )
});

export const updateProfile = asyncHandler(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user._id, newUserData, {
    new: true,
  });

  res
    .status(200)
    .json(
    new apiResponse(200, "user updated", user)
  )
});

// Get all Users - ADMIN  =>  /api/v1/admin/users
export const allUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json(
    new apiResponse(200, "all users fetched", users)
  )
});