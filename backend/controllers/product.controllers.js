
//1. get all products

import Product from "../models/product.models.js"
import productData from '../../data.js'
import asyncHandler from "../utils/asyncHandler.js"
import apiResponse from "../utils/apiResponse.js"


export const getAllProduct = asyncHandler(async (req, res, next)=>{
    console.log("hello")
    await Product.find()
        .then((data)=>{
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
   await Product.insertMany(productData)
       .then((data)=>{
        res
          .status(200)
          .json(
            new apiResponse(200, "Data inserted Successfully", data)
          )
       })
       .catch((error)=>next(error));

})

//3. get product detail
export const getSingleProduct = async ()=>{

}

//4. update product
export const updateProduct = async ()=>{

}


//5. delete product
export const deleteProduct = async ()=>{

}
