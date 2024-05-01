import Order from "../models/order.model.js";
import Product from "../models/product.models.js";
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
  
 
// Get order details  =>  /api/v1/orders/:id
export const getOrderDetails = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params?.orderId).populate(
      "user",
      "name email"
    );
  
    if (!order) {
      throw new apiError(404, "No Order found with this ID");
    }
  
    return res
    .status(200)
    .json(
        new apiResponse(200, "order details fetched!", order)
    );
  });

  // Get all orders - ADMIN  =>  /api/v1/admin/orders
export const allOrders = asyncHandler(async (req, res, next) => {
    const orders = await Order.find();
  
    return res
    .status(200)
    .json(
        new apiResponse(200, "all order fetched!", orders)
    );
  });
  
  // Update Order - ADMIN  =>  /api/v1/admin/orders/:id
  export const updateOrder = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
  
    if (!order) {
      throw new apiError(404, "No Order found with this ID");
    }
  
    if (order?.orderStatus === "Delivered") {
      throw new apiError(404, "This order has already been delivered!");
    }
  
    // Update products stock
    order?.orderItems?.forEach(async (item) => {
      const product = await Product.findById(item?.product?.toString());
      if (!product) {
        throw new apiError(404, "No Product found with this ID");
      }
      product.stock = product.stock - item.quantity;
      await product.save({ validateBeforeSave: false });
    });
  
    order.orderStatus = req.body.status;
    order.deliveredAt = Date.now();
  
    await order
        .save()
        .then((udpatedOrder)=>{
            return res
            .status(200)
            .json(
                apiResponse(200, "order udpated!", updatedOrder)
            );
        })
        .catch(error=>next(error));  
  });
  // Delete order  =>  /api/v1/admin/orders/:id
export const deleteOrder = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
  
    if (!order) {
      throw new apiError(404, "No Order found with this ID");
    }
  
    await order.deleteOne();
  
    return res
    .status(200)
    .json(
        new apiResponse(200, "order deleted!", null)
    );
  });