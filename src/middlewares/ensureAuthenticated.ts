import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '../errors/AppError';
import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersReposotirory';

async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    throw new AppError('Token is missing', 401);
  }

  const [, token] = authToken.split(' ');
  try {
    const { sub: user_id } = verify(token, '98e4b32c4c731bdeb440434f8bac1488');

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id as string);

    if (!user) {
      throw new AppError('This user does not exists');
    }

    request.user = {
      id: user.id,
    };

    next();
  } catch (error) {
    throw new AppError('Invalid token', 401);
  }
}

export { ensureAuthenticated };
