
//1. get all products

import Product from "../models/product.models.js"

export const getAllProduct = async ()=>{
    const products = await Product.find();
    if(!products){
        throw Error
    }
}

//2. add new product
export const addNewProduct = async ()=>{

}

//3. get product detail
export const getSingleProduct = async ()=>{

}

//4. update product
export const updateProduct = async ()=>{

}


//5. delete product
export const deleteProduct = async ()=>{

}
