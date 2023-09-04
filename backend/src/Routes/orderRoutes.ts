import express from 'express';
import {
  createPurchaseOrder,
  pastOrderDetails,
  pastOrders,
} from '../Controller/orderController';

const router = express.Router();
router.route('/purchase_order').get(createPurchaseOrder);
router.route('/all_orders').get(pastOrders);
router.route('/past_order/:orderId').get(pastOrderDetails);

export default router;
