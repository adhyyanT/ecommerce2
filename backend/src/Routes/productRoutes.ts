import express from 'express';
import {
  getAllProducts,
  getOneProduct,
  //   search,
} from '../Controller/productController';

const router = express.Router();
router.route('/all_products').get(getAllProducts);
// router.route('/search').post(search);
router.route('/product/:productId').get(getOneProduct);
export default router;
