import express from 'express';
import { getAllProducts, search } from '../Controller/productController';

const router = express.Router();
router.route('/all_products').get(getAllProducts);
router.route('/search').post(search);
export default router;
