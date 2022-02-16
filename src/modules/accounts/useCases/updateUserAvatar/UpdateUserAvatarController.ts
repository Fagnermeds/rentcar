import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';

class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { filename } = request.file;

    const updateUserAvatar = container.resolve(UpdateUserAvatarUseCase);

    await updateUserAvatar.execute({
      user_id,
      avatar: filename,
    });

    return response.status(204).send();
  }
}

export { UpdateUserAvatarController };
