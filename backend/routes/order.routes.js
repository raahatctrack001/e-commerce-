import express from 'express'
import { 
    getOrderDetails,
    myOrders,
    newOrder 
} from '../controllers/order.cotrollers.js';
import { verifyUser } from '../middlewares/auth.middlewares.js';

const router = express.Router();

router.route('/new-order').post(verifyUser, newOrder);
router.route('/order-detail').get(verifyUser, myOrders);
router.route('/order-details/:orderId').get(verifyUser, getOrderDetails);


export default router;