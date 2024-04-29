import express from 'express'
import { 
    addNewProduct, 
    deleteProduct, 
    getAllProducts, 
    getSingleProduct, 
    updateProduct 
} from '../controllers/product.controllers.js';

const router = express.Router();

router.route('/get-all-products').get(getAllProducts);
router.route('/get-single-product/:productId').get(getSingleProduct);
router.route('/add-new-product').post(addNewProduct);
router.route('/update-product/:productId').patch(updateProduct);
router.route('/delete-product/:productId').delete(deleteProduct);

export default router;
