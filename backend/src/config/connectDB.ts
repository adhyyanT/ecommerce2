import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { createClient } from 'redis';

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DATABASE!,
  process.env.USER!,
  process.env.PASSWORD!,
  {
    host: process.env.HOST!,
    dialect: 'postgres',
    port: parseInt(process.env.DB_PORT!),
    logging: console.log,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

export const client = createClient({
  url: process.env.redis_uri,
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .then(() => {
    client.connect().then(() => console.log('connected to Cache'));
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

client.on('error', (e) => {
  console.log(e);
});
