import express from 'express'
import { addNewProduct, deleteProduct, getAllProduct, getSingleProduct, updateProduct } from '../controllers/product.controllers.js';

const router = express.Router();

router.route('/get-all-products').get(getAllProduct);
router.route('/get-single-product/:productId').get(getSingleProduct);
router.route('/add-new-product').post(addNewProduct);
router.route('/update-product/:productId').patch(updateProduct);
router.route('/delete-product/:productId').delete(deleteProduct);

export default router;
