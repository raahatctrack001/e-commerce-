import express from 'express'
import { 
    allOrders,
    deleteOrder,
    getOrderDetails,
    myOrders,
    newOrder, 
    updateOrder
} from '../controllers/order.cotrollers.js';
import { verifyUser } from '../middlewares/auth.middlewares.js';



const router = express.Router();

router.route('/new-order').post(verifyUser, newOrder);
router.route('/me/order-details').get(verifyUser, myOrders);
router.route('/order-detail/:orderId').get(verifyUser, getOrderDetails);
router.route('/admin/get-all-orders').get(verifyUser, allOrders);
router.route('/admin/update-order/:orderId').post(verifyUser, updateOrder);
router.route('/admin/delete-order/:orderId').delete(verifyUser, deleteOrder);
export default router;