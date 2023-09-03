import { RequestHandler } from 'express';
import { User } from '../Models/User';
import bcrypt from 'bcrypt';
import { AppDataSource } from '../config/connectDB';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const userRepo = AppDataSource.getRepository(User);

export const register: RequestHandler<
  unknown,
  unknown,
  RegisterBody,
  unknown
> = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) return;

    const already = await userRepo.findOne({
      where: [{ username }, { email }],
    });

    if (already) return;
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
    console.log(error);
  }
};

export const login: RequestHandler<
  unknown,
  unknown,
  LoginBody,
  unknown
> = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return;
    const user = await userRepo.findOne({
      where: {
        username,
      },
    });
    if (!user) return;
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return;
    req.login(user, { session: false }, (err) => {
      if (err) return;
      const token = jwt.sign({ user }, process.env.secret!, {
        expiresIn: `9d`,
      });
      return res.status(200).json({ user, token });
    });
  } catch (error) {
    console.log(error);
  }
};

export const logout: RequestHandler = async (req, res) => {
  try {
    req.logout((err) => {
      if (err) return;
    });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
};
