import express from 'express'
import { 
    addNewProduct, 
    deleteProduct, 
    getAllProducts, 
    getSingleProduct, 
    updateProduct 
} from '../controllers/product.controllers.js';
import { verifyUser } from '../middlewares/auth.middlewares.js';

const router = express.Router();

router.route('/get-all-products').get(getAllProducts);
router.route('/get-single-product/:productId').get(getSingleProduct);
router.route('/add-new-product').post(verifyUser, addNewProduct);
router.route('/update-product/:productId').patch(verifyUser, updateProduct);
router.route('/delete-product/:productId').delete(verifyUser, deleteProduct);

export default router;
