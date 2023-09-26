import { RequestHandler } from 'express';
import { Cart } from '../Models/Cart';
import { PurchasedItem } from '../Models/PurchasedItem';
import { getCartHelper } from './cartController';
import Stripe from 'stripe';
import {
  OrderDetailParams,
  StripeSessionType,
  emailType,
  EmailProductType,
} from '../types';
import { Queue } from 'bullmq';
import { User } from '../Models/User';
import IORedis from 'ioredis';
import { PurchaseOrder } from '../Models/PurchasedOrder';
import { sequelize } from '../config/connectDB';
import { QueryTypes } from 'sequelize';
import { SendMessageCommand, SQSClient } from '@aws-sdk/client-sqs';

const stripe = new Stripe(process.env.stripe_key!, {
  apiVersion: '2023-08-16',
});

export const createPurchaseOrder: RequestHandler<
  unknown,
  unknown,
  unknown,
  StripeSessionType
> = async (req, res, next) => {
  try {
    const userId = req.user!.id;
    const userCart = await getCartHelper(userId);
    console.log(userCart);
    const session = await stripe.checkout.sessions.retrieve(
      req.query.session_id!
    );
    if (!session || session.status !== 'complete' || userCart.length === 0)
      return res.sendStatus(400);

    // send email to client
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    let emailProducts: EmailProductType[] = [];
    let total = 0;

    //create purchase order
    const po = await PurchaseOrder.create({ user_id: userId });
    userCart.map(async (product: any) => {
      total += product.price * product.count;
      emailProducts.push({
        title: product.title,
        count: product.count,
        price: product.price,
      });
      await PurchasedItem.create({
        count: product.count,
        item_id: product.product_id,
        purchase_order_id: po.order_id,
      });
    });
    await Cart.destroy({
      where: {
        user_id: userId,
      },
    });

    const emailData = {
      emailId: user!.email,
      total,
      emailProducts,
      name: user!.name,
    };
    res.sendStatus(200);
    const client = new SQSClient({
      region: process.env.aws_region,
      credentials: {
        accessKeyId: process.env.access_key_id!,
        secretAccessKey: process.env.secret_access_key!,
      },
    });

    const queue = process.env.sqs_url!;
    const command = new SendMessageCommand({
      QueueUrl: queue,
      MessageAttributes: {
        email: {
          DataType: 'String',
          StringValue: emailData.emailId,
        },
        total: {
          DataType: 'Number',
          StringValue: emailData.total + '',
        },
        name: {
          DataType: 'String',
          StringValue: emailData.name,
        },
        products: {
          DataType: 'String',
          StringValue: JSON.stringify(emailData.emailProducts),
        },
      },
      MessageBody: 'check attributes',
    });

    const cmd = await client.send(command);
  } catch (error) {
    next(error);
  }
};

export const pastOrders: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user!.id;
    const allOrders = await PurchaseOrder.findAll({
      where: {
        user_id: userId,
      },
    });
    return res.status(200).json(allOrders);
  } catch (error) {
    next(error);
  }
};
export const pastOrderDetails: RequestHandler<
  OrderDetailParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const order = req.params.orderId;
    const userId = req.user!.id;
    const items = await sequelize.query(
      `
        SELECT pi.item_id,pi.count,p.price,p.image,p.title
        from purchase_order as po
        INNER JOIN purchase_item as pi
        ON po.order_id = pi.purchase_order_id
        INNER JOIN product as p
        ON p.id = pi.item_id
        Where po.user_id = $1
        AND pi.purchase_order_id = $2
      `,
      {
        bind: [userId, order],
        type: QueryTypes.SELECT,
      }
    );
    return res.status(200).json(items);
  } catch (error) {
    next(error);
  }
};
