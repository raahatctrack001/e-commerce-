import Order from "../models/order.model.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// Create new Order  =>  /api/v1/orders/new
export const newOrder = asyncHandler(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
    paymentMethod,
    paymentInfo,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
    paymentMethod,
    paymentInfo,
    user: req.user._id,
  });
  console.log(order)
  return res
  .status(200)
  .json(
        new apiResponse(200, "order placed!", order)
    )
});

// Get current user orders  =>  /api/v1/me/orders
export const myOrders = asyncHandler(async (req, res, next) => {
    const orders = await Order.find({ user: req.user?._id });
  
    return res
    .status(200)
    .json(
        new apiResponse(200, "order fetched!", orders)
    );
  });
  
 
