//1. get all products
import Product from "../models/product.models.js"
import productData from '../../data.js'
import asyncHandler from "../utils/asyncHandler.js"
import apiResponse from "../utils/apiResponse.js"
import apiError from "../utils/apiError.js"


export const getAllProduct = asyncHandler(async (req, res, next)=>{
    console.log("hello")
    await Product.find()
        .then((data)=>{
            if(!data){
              throw new apiError(404, "Data not found");
            }
            res
                .status(200)
                .json(
                     new apiResponse(200, "Data Fetched Successfully", data)
                )
        })
        .catch((error)=>next(error));    
})

//2. add new product
export const addNewProduct = asyncHandler(async (req, res, next)=>{
  //  await Product.insertMany(productData)
  //      .then((data)=>{
  //       res
  //         .status(200)
  //         .json(
  //           new apiResponse(200, "Data inserted Successfully", data)
  //         )
  //      })
  //      .catch((error)=>next(error));

  console.log(req.body)
  await Product.create(req.body, { new: true })
      .then((data)=>{
        if(!data){
          throw new apiError(401, "Internal Server Error");
        }

        res
          .status(200)
          .json(
            new apiResponse(200, "product added", data)
          )
      })
      .catch((error)=>next(error));
})

//3. get product detail
export const getSingleProduct = asyncHandler(async (req, res, next)=>{
  console.log(req.params)
  await Product.findById(req.params?.productId)
    .then((data)=>{
      if(!data){
        throw new apiError(404, "product not found!")
      }
      res
        .status(200)
        .json(
          new apiResponse(200, "product found!", data)
        )
    })
    .catch((error)=>next(error))
})

//4. update product
export const updateProduct = asyncHandler(async (req, res, next)=>{
  await Product.findByIdAndUpdate(req.params?.productI, req.body, { new: true })
      .then((data)=>{
        if(!data){
          throw new apiError(404, "Product not found")
        }
        res
          .status(200)
          .json(
            new apiResponse(200, "product updated", data)
          )
      })
      .catch(error=>next(error))
})


//5. delete product
export const deleteProduct = asyncHandler( async (req, res, next) => {
    await Product.findByIdAndDelete(req.params?.productId)
      .then((data)=>{
        console.log(data);
        if(!data){
          throw new apiError(404, "Internal server error")
        }

        res
          .status(200)
          .json(
            new apiResponse(200, "product deleted", data)
          )
      })
      .catch(error=>next(error));
})