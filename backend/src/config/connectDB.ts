import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../Models/User';
import dotenv from 'dotenv';
import { Product } from '../Models/Product';
import { Cart } from '../Models/Cart';
import { PurchasedItem } from '../Models/PurchasedItem';
import { PurchasedOrder } from '../Models/PurchasedOrder';
dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.HOST,
  port: parseInt(process.env.DB_PORT!),
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  username: process.env.USER,
  synchronize: true,
  // logging: true,
  entities: [User, Product, Cart, PurchasedItem, PurchasedOrder],
  // entities: ['./backend/Models/*.ts'],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

export { AppDataSource };
