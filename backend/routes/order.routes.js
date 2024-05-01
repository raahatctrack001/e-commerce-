import express from 'express'
import { 
    newOrder 
} from '../controllers/order.cotrollers.js';

const router = express.Router();

router.route('/new-order', newOrder);
export default router;