import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import passport from './config/passport';
import userRoutes from './Routes/userRoutes';
import profileRoutes from './Routes/profileRoutes';
import { errorHandler } from './middleware/errorHandler';
import createHttpError from 'http-errors';
import cartRoutes from './Routes/cartRoutes';
import orderRoute from './Routes/orderRoutes';
import productRoute from './Routes/productRoutes';

dotenv.config();

const app = express();
app.use(passport.initialize());
app.use(express.json());
app.use(
  cors({
    origin: process.env.client!,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
    allowedHeaders: '*',
    exposedHeaders: '*',
  })
);
app.use(morgan('combined'));

app.use('/api/user', userRoutes);
app.use(passport.authenticate('jwt', { session: false }));
app.use('/api/profile', profileRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoute);
app.use('/api/products', productRoute);

app.use((req, res, next) => {
  next(createHttpError(404, 'Page not found'));
});
app.use(errorHandler);

export default app;
