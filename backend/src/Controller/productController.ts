import { RequestHandler } from 'express';
import { Product } from '../Models/Product';
import { PaginationType, ProductIdParams, SearchBody } from '../types';
import { Op } from 'sequelize';
import { client } from '../config/connectDB';

export const getAllProducts: RequestHandler<
  unknown,
  unknown,
  unknown,
  PaginationType
> = async (req, res, next) => {
  try {
    let { page, size, search, filters } = req.query;
    let filter_arr: string[] = [];
    if (!page) page = 0;
    if (!size) size = 10;
    if (!search) search = '';
    if (filters) {
      filters = filters.trim();
      filter_arr = filters.split(',');
    }
    if (!filters || filters.length === 0) {
      const products = await Product.findAndCountAll({
        limit: size,
        offset: page * size,
        where: {
          [Op.or]: [
            {
              title: {
                [Op.iLike]: `%${search}%`,
              },
            },
            {
              category: {
                [Op.iLike]: `%${search}%`,
              },
            },
            {
              desc: {
                [Op.iLike]: `%${search}%`,
              },
            },
          ],
        },
      });
      filters = '';
      const key = 'ecom2' + filters + '~' + search + '~' + size + '~' + page;
      const total = products.count;
      const product = products.rows;
      await client.set(key, JSON.stringify(products));
      return res.status(200).json({ product: product, total });
    }
    const products = await Product.findAndCountAll({
      limit: size,
      offset: page * size,
      where: {
        category: {
          [Op.in]: filter_arr,
        },
        [Op.or]: {
          title: {
            [Op.iLike]: `%${search}%`,
          },
          desc: {
            [Op.iLike]: `%${search}%`,
          },
        },
      },
    });
    const key = 'ecom2' + filters + '~' + search + '~' + size + '~' + page;
    const total = products.count;
    const product = products.rows;
    await client.set(key, JSON.stringify(products));
    return res.status(200).json({ product, total });
  } catch (error) {
    next(error);
  }
};

export const getOneProduct: RequestHandler<
  ProductIdParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findOne({ where: { id: productId } });
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
