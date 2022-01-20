import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '../modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '../modules/cars/useCases/importCategory/ImportCategoryController';
import { ListCategoryController } from '../modules/cars/useCases/listCategory/ListCategoryController';

const categoriesRoutes = Router();

const upload = multer({
  dest: './tmp',
});

const createCategoryController = new CreateCategoryController();
const listCategoryController = new ListCategoryController();
const importCategoryController = new ImportCategoryController();

categoriesRoutes.post('/categories', createCategoryController.handle);

categoriesRoutes.get('/categories', listCategoryController.handle);

categoriesRoutes.post(
  '/categories/import',
  upload.single('file'),
  importCategoryController.handle
);

export { categoriesRoutes };
