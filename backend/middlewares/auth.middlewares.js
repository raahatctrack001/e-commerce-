import User from "../models/user.models.js";
import apiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'

// Checks if user is authenticated or not
export const verifyUser = asyncHandler(async (req, res, next) => {

    const { token } = req.cookies

    if (!token) {
        throw new apiError(401, "Unauthorized Activity!")
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id);

    next()
})
