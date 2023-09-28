import dotenv from 'dotenv';
import { RequestHandler } from 'express';
import { PaginationType, ProductsType } from '../types';
import { client } from '../config/connectDB';

dotenv.config();

export const rediStore: RequestHandler<
  unknown,
  unknown,
  unknown,
  PaginationType
> = async (req, res, next) => {
  try {
    let { filters, page, search, size } = req.query;
    if (!filters) filters = '';
    if (!search) search = '';
    if (!page) page = 0;
    if (!size) size = 0;
    const key = 'ecom2' + filters + '~' + search + '~' + size + '~' + page;
    const containsKey = await client.exists(key);
    if (containsKey === 1) {
      const _products = await client.get(key);
      const products: ProductsType = await JSON.parse(_products!);
      const product = products.rows;
      const total = products.count;
      return res.status(200).json({ product, total });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};
