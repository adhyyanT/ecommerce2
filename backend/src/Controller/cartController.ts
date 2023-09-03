import { RequestHandler } from 'express';
import { AppDataSource } from '../config/connectDB';
import { Cart } from '../Models/Cart';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import { PurchasedOrder } from '../Models/PurchasedOrder';
import { PurchasedItem } from '../Models/PurchasedItem';
dotenv.config();

const stripe = new Stripe(process.env.stripe_key!, {
  apiVersion: '2023-08-16',
});

const cartRepo = AppDataSource.getRepository(Cart);
const poRepo = AppDataSource.getRepository(PurchasedOrder);
const piRepo = AppDataSource.getRepository(PurchasedItem);

const getCartHelper = async (userId: number) => {
  const res = await cartRepo.query(
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
    [userId]
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
    const cart = new Cart();
    cart.product_id = productId;
    cart.user_id = userId;
    await cartRepo.save(cart);
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

    const cartIdToDelete = await cartRepo
      .createQueryBuilder()
      .select('cart_id')
      .where('product_id = :id1', { id1: productId })
      .andWhere('user_id = :id2', { id2: userId })
      .limit(1)
      .execute();

    await cartRepo
      .createQueryBuilder()
      .delete()
      .from(Cart)
      .where('cart_id IN (:...id)', {
        id: [cartIdToDelete[0].cart_id],
      })
      .execute();

    const userCart = await getCartHelper(userId);
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
        quantity: userCart[i].count,
      };
      line_items.push(obj);
    }
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      success_url: `${process.env.client}/cart?success=true`,
      cancel_url: `${process.env.client}/cart?canceled=true`,
    });

    //create purchase order
    const po = new PurchasedOrder();
    po.user_id = userId;
    let t = await poRepo.save(po);

    // add purchase products
    userCart.map(async (product: any) => {
      const pi = new PurchasedItem();
      pi.purchase_order_id = t.order_id;
      pi.item_id = product.product_id;
      pi.count = product.count;
      await piRepo.save(pi);
    });

    await cartRepo
      .createQueryBuilder()
      .delete()
      .where('user_id = :id', { id: userId })
      .execute();
    return res.status(200).json({ url: session.url });
  } catch (error) {
    next(error);
  }
};

export const pastOrders: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user!.id;
    const allOrders = await poRepo.find({
      where: {
        user_id: userId,
      },
    });
  } catch (error) {
    next(error);
  }
};
