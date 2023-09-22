import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
// HOST=db.vfviigapinvcwsgzlnyd.supabase.co

export const sequelize = new Sequelize(
  process.env.DATABASE!,
  process.env.USER!,
  process.env.PASSWORD!,
  {
    host: process.env.HOST!,
    dialect: 'postgres',
    port: parseInt(process.env.DB_PORT!),
    // logging: true,
    logging: console.log,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
