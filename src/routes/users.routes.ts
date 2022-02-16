import { Router } from 'express';
import multer from 'multer';

import uplodaConfig from '../config/upload';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateUserController } from '../modules/accounts/useCases/createUser/CreateUserController';
import { UpdateUserAvatarController } from '../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';

const usersRoutes = Router();

const upload = multer(uplodaConfig.upload('./tmp/avatar'));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post('/users', createUserController.handle);

usersRoutes.patch(
  '/users/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  updateUserAvatarController.handle
);

export { usersRoutes };
