import express from 'express'
import { 
    allOrders,
    getOrderDetails,
    myOrders,
    newOrder, 
    updateOrder
} from '../controllers/order.cotrollers.js';
import { verifyUser } from '../middlewares/auth.middlewares.js';
import { verify } from 'crypto';

const router = express.Router();

router.route('/new-order').post(verifyUser, newOrder);
router.route('/me/order-details').get(verifyUser, myOrders);
router.route('/order-detail/:orderId').get(verifyUser, getOrderDetails);
router.route('/admin/get-all-orders').get(verifyUser, allOrders);
router.route('/admin/update-order/:orderId').post(verifyUser, updateOrder);

export default router;