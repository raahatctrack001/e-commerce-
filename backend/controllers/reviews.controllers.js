import Product from "../models/product.models.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// Create/Update product review   =>  /api/v1/reviews
export const createProductReview = asyncHandler(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
  
    const review = {
      user: req?.user?._id,
      rating: Number(rating),
      comment,
    };
  
    const product = await Product.findById(productId);
  
    if (!product) {
      throw new apiError(404, "Product not found");
    }
  
    const isReviewed = product?.reviews?.find(
      (r) => r.user.toString() === req?.user?._id.toString()
    );
  
    if (isReviewed) {
      product.reviews.forEach((review) => {
        if (review?.user?.toString() === req?.user?._id.toString()) {
          review.comment = comment;
          review.rating = rating;
        }
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }
  
    product.ratings =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;
  
    await product.save({ validateBeforeSave: false });
  
    return res
        .status(200)
        .json(

            new apiResponse(200, "review posted", product?.reviews)
        );
  });
  
  // Get product reviews   =>  /api/v1/reviews
export const getProductReviews = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
  
    if (!product) {
      throw new apiError(404, "Product not found");
    }
  
    return res
    .status(200)
    .json(
        new apiResponse(200, "products reviews fetched",  {reviews: product.reviews})
    );
  });
  
  // Delete product review   =>  /api/v1/admin/reviews
export const deleteReview = asyncHandler(async (req, res, next) => {
    let product = await Product.findById(req.query.productId);
  
    if (!product) {
      throw new apiError(404, "Product not found");
    }
  
    const reviews = product?.reviews?.filter(
      (review) => review._id.toString() !== req?.query?.id.toString()
    );
  
    const numOfReviews = reviews.length;
  
    const ratings =
      numOfReviews === 0
        ? 0
        : product.reviews.reduce((acc, item) => item.rating + acc, 0) /
          numOfReviews;
  
    product = await Product.findByIdAndUpdate(
      req.query.productId,
      { reviews, numOfReviews, ratings },
      { new: true }
    );
  
    return res
        .status(200)
        .json(
            new apiResponse(200, "review deleted!", product)
        );
  });