import express from 'express';
import {
  getAllProducts,
  getOneProduct,
  //   search,
} from '../Controller/productController';
import { rediStore } from '../middleware/cache';

const router = express.Router();
router.route('/all_products').get(rediStore, getAllProducts);
router.route('/product/:productId').get(getOneProduct);
export default router;
