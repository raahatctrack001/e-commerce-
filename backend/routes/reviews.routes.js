import express from 'express';
import { verifyUser } from '../middlewares/auth.middlewares.js';
import { 
    createProductReview,
    deleteReview,
    getProductReviews
} from '../controllers/reviews.controllers.js';

const router = express.Router();

router.route('/post-review').post(verifyUser, createProductReview);
router.route('/product-reviews/:productId').get(getProductReviews);
router.route('/delete-review/:reviewId').delete(deleteReview);




export default router;