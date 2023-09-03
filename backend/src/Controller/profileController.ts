import { RequestHandler } from 'express';

export const getProfile: RequestHandler = async (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    console.log(error);
  }
};
