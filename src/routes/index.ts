import { Router } from 'express';

import { authenticateRoutes } from './authenticate.routes';
import { categoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './specification.routes';
import { usersRoutes } from './users.routes';

const router = Router();

router.use(categoriesRoutes);
router.use(usersRoutes);
router.use(authenticateRoutes);
router.use(specificationsRoutes);

export { router };
