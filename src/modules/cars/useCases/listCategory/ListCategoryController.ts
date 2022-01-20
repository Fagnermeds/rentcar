import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListCategoryUseCase } from './ListCategoryUseCase';

class ListCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCategory = container.resolve(ListCategoryUseCase);
    const repositories = await listCategory.execute();

    return response.json(repositories);
  }
}

export { ListCategoryController };
