import { RequestHandler } from 'express';
import { User } from '../Models/User';
import bcrypt from 'bcrypt';
import { AppDataSource } from '../config/connectDB';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { LoginBody, RegisterBody } from '../types';
import createHttpError from 'http-errors';
dotenv.config();

const userRepo = AppDataSource.getRepository(User);

export const register: RequestHandler<
  unknown,
  unknown,
  RegisterBody,
  unknown
> = async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password)
      return next(createHttpError(400, 'All fields are mandatory'));

    const already = await userRepo.findOne({
      where: [{ username }, { email }],
    });

    if (already)
      next(
        createHttpError(
          400,
          'A user already exists with the same Email Or Username'
        )
      );
    const user = new User();
    user.email = email;
    user.name = name;
    user.username = username;
    user.password = await bcrypt.hash(password, 10);
    await userRepo.save(user);

    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      const token = jwt.sign({ user }, process.env.secret!, {
        expiresIn: `${1000 * 60 * 10}`,
      });
      return res.status(200).json({ user, token });
    });
  } catch (error) {
    next(error);
  }
};

export const login: RequestHandler<
  unknown,
  unknown,
  LoginBody,
  unknown
> = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return next(createHttpError(400, 'All fields are mandatory'));
    const user = await userRepo.findOne({
      where: {
        email,
      },
    });
    if (!user) return next(createHttpError(400, 'Account does not exist.'));
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(createHttpError(400, 'Password Incorrect'));
    req.login(user, { session: false }, (err) => {
      if (err) return;
      const token = jwt.sign({ user }, process.env.secret!, {
        expiresIn: `9d`,
      });
      return res.status(200).json({ user, token });
    });
  } catch (error) {
    next(error);
  }
};

export const logout: RequestHandler = async (req, res, next) => {
  try {
    req.logout((err) => {
      if (err) return;
    });
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
