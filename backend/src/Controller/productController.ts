import { RequestHandler } from 'express';
import { AppDataSource } from '../config/connectDB';
import { Product } from '../Models/Product';
import { PaginationType, ProductIdParams, SearchBody } from '../types';
import { Brackets } from 'typeorm';

const productRepo = AppDataSource.getRepository(Product);

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
      const total = await productRepo
        .createQueryBuilder('p')
        .where('p.title ilike :search', { search: `%${search}%` })
        .orWhere('p.desc ilike :search1', { search1: `%${search}%` })
        .orWhere('p.category ilike :search2', { search2: `%${search}%` })
        .getCount();
      const product = await productRepo
        .createQueryBuilder('p')
        .where('p.title ilike :search', { search: `%${search}%` })
        .orWhere('p.desc ilike :search1', { search1: `%${search}%` })
        .orWhere('p.category ilike :search2', { search2: `%${search}%` })
        .offset(page * size)
        .limit(size)
        .execute();
      return res.status(200).json({ product, total });
    }
    const total = await productRepo
      .createQueryBuilder('p')
      .where(
        new Brackets((b) => {
          b.where('p.title ilike :search', { search: `%${search}%` }).orWhere(
            'p.desc ilike :search1',
            { search1: `%${search}%` }
          );
        })
      )
      .andWhere('p.category in (:...filter)', { filter: filter_arr! })
      .getCount();
    const product = await productRepo
      .createQueryBuilder('p')
      .where(
        new Brackets((b) => {
          b.where('p.title ilike :search', { search: `%${search}%` }).orWhere(
            'p.desc ilike :search1',
            { search1: `%${search}%` }
          );
        })
      )
      .andWhere('p.category in (:...filter)', { filter: filter_arr! })
      .offset(page * size)
      .limit(size)
      .execute();
    return res.status(200).json({ product, total });
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
    const filters = req.body.filters;
    if (!filters || filters.length === 0) {
      const product = await productRepo
        .createQueryBuilder('p')
        .where('p.title ilike :search', { search: `%${search}%` })
        .orWhere('p.desc ilike :search1', { search1: `%${search}%` })
        .orWhere('p.category ilike :search2', { search2: `%${search}%` })
        .execute();
      return res.status(200).json(product);
    }
    const product = await productRepo
      .createQueryBuilder('p')
      .where(
        new Brackets((b) => {
          b.where('p.title ilike :search', { search: `%${search}%` }).orWhere(
            'p.desc ilike :search1',
            { search1: `%${search}%` }
          );
        })
      )
      .andWhere('p.category in (:...filter)', { filter: filters })
      .execute();
    return res.status(200).json(product);
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
    const product = await productRepo.findOneBy({ id: productId });
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
