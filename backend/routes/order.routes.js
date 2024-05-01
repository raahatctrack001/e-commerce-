import express from 'express'
import { 
    myOrders,
    newOrder 
} from '../controllers/order.cotrollers.js';
import { verifyUser } from '../middlewares/auth.middlewares.js';

const router = express.Router();

router.route('/new-order').post(verifyUser, newOrder);
router.route('/order-detail').get(verifyUser, myOrders);

export default router;