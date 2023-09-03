import { NextFunction, Request, Response } from 'express';
import { isHttpError } from 'http-errors';
export const errorHandler = async (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  let msg = 'server error';
  let code = 500;
  if (isHttpError(err)) {
    code = err.status;
    msg = err.message;
  }
  return res.status(code).json(msg);
};
