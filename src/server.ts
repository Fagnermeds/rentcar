import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import 'reflect-metadata';

import './database';
import './shared/container';
import { AppError } from './errors/AppError';
import { router } from './routes';

const app = express();

app.use(express.json());
app.use(router);
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      message: err.message,
    });
  }
);

app.listen(3333, () => console.log('Server running...'));
