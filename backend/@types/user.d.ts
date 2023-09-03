// import Express from 'express';

declare namespace Express {
  export interface Request {
    user?: {
      name: string;
      id: number;
      email: string;
      password: string;
      username: string;
      createdAt: Date;
    };
  }
}
