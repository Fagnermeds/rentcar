import { inject, injectable } from 'tsyringe';

import { deleteFile } from '../../../../utils/file';
import { UsersRepository } from '../../repositories/implementations/UsersReposotirory';

interface IRequest {
  user_id: string;
  avatar: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository
  ) {}

  async execute({ user_id, avatar }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);
    console.log(user.avatar);
    if (user.avatar) {
      await deleteFile(`tmp/avatar/${user.avatar}`);
    }

    user.avatar = avatar;

    await this.usersRepository.update(user);
  }
}

export { UpdateUserAvatarUseCase };
