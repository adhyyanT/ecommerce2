import express from 'express';
import {
  addToCart,
  checkOut,
  getCart,
  removeFromCart,
} from '../Controller/cartController';

const router = express.Router();

router.route('/checkout').get(checkOut);
router.route('/getcart').get(getCart);
router.route('/add/:productId').get(addToCart);
router.route('/remove/:cartId').delete(removeFromCart);
export default router;
