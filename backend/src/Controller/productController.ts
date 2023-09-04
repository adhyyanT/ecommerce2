import { RequestHandler } from 'express';
import { AppDataSource } from '../config/connectDB';
import { Product } from '../Models/Product';
import { PaginationType, SearchBody } from '../types';
import { Like, ILike } from 'typeorm';

const productRepo = AppDataSource.getRepository(Product);

export const getAllProducts: RequestHandler<
  unknown,
  unknown,
  unknown,
  PaginationType
> = async (req, res, next) => {
  try {
    let { page, size } = req.query;
    if (!page) page = 0;
    if (!size) size = 10;
    const total = await productRepo.createQueryBuilder('p').getCount();
    const product = await productRepo
      .createQueryBuilder('p')
      .offset(page * size)
      .limit(size)
      .execute();
    return res.status(200).json({ total, product });
  } catch (error) {
    next(error);
  }
};

export const search: RequestHandler<
  unknown,
  unknown,
  SearchBody,
  unknown
> = async (req, res, next) => {
  try {
    const search = req.body.search;

    const product = await productRepo
      .createQueryBuilder('p')
      .where('p.title ilike :search', { search: `%${search}%` })
      .orWhere('p.desc ilike :search1', { search1: `%${search}%` })
      .orWhere('p.category ilike :search2', { search2: `%${search}%` })
      .execute();
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
