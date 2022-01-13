import { Request, Response } from 'express';

import { ListCategoryUseCase } from './ListCategoryUseCase';

class ListCategoryController {
  constructor(private listCategory: ListCategoryUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const repositories = await this.listCategory.execute();

    return response.json(repositories);
  }
}

export { ListCategoryController };
