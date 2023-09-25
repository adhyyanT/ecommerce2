import { RequestHandler } from 'express';

import { Cart } from '../Models/Cart';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import { PurchaseOrder } from '../Models/PurchasedOrder';
import { PurchasedItem } from '../Models/PurchasedItem';
import { AddtoCartParams, RemoveFromCartParams } from '../types';
import { sequelize } from '../config/connectDB';
import { QueryTypes, where } from 'sequelize';
dotenv.config();

const stripe = new Stripe(process.env.stripe_key!, {
  apiVersion: '2023-08-16',
});

type CartModel = {
  product_id: number;
  count: string;
  title: string;
  desc: string;
  price: number;
  image: string;
};
export const getCartHelper = async (userId: number) => {
  const res = await sequelize.query<CartModel>(
    `
        SELECT c1.product_id, c1.count,p.title,p.desc,p.price,p.image
        FROM product as p
        INNER JOIN
            (SELECT c.product_id,COUNT(c.product_id) as count
            FROM cart as c
            WHERE c.user_id = $1
            GROUP BY c.product_id) as c1
        ON p.id = c1.product_id
            `,
    {
      bind: [userId],
      type: QueryTypes.SELECT,
    }
  );
  return res;
};

export const addToCart: RequestHandler<
  AddtoCartParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const userId = req.user!.id;
    console.log('-------' + userId);
    await Cart.create({ product_id: productId, user_id: userId });
    return res.status(201).json(productId);
  } catch (error) {
    next(error);
  }
};

export const getCart: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user!.id;
    const userCart = await getCartHelper(userId);
    return res.status(200).json(userCart);
  } catch (error) {
    next(error);
  }
};

export const removeFromCart: RequestHandler<
  RemoveFromCartParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const userId = req.user!.id;
    const productId = req.params.cartId;

    const cart = await Cart.destroy({
      where: {
        product_id: productId,
        user_id: userId,
      },
      limit: 1,
    });
    console.log(cart);

    const userCart = await Cart.findAll({
      where: {
        user_id: userId,
      },
    });
    return res.status(200).json(userCart);
  } catch (error) {
    next(error);
  }
};
export const checkOut: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user!.id;
    const userCart = await getCartHelper(userId);
    let line_items = [];
    for (let i = 0; i < userCart.length; i++) {
      const obj = {
        price_data: {
          currency: 'inr',
          product_data: {
            name: userCart[i].title,
          },
          unit_amount: userCart[i].price * 100 * 82,
        },
        quantity: parseInt(userCart[i].count),
      };
      line_items.push(obj);
    }
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      success_url: `${process.env.client}/order/done?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.client}/order/done?canceled=true`,
    });
    const _ = await getCartHelper(userId);
    return res.status(200).json({ url: session.url });
  } catch (error) {
    next(error);
  }
};
