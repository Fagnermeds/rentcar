import { Request, Response } from 'express';

import { ImportCategoryUseCase } from './ImportCategoryUseCase';

class ImportCategoryController {
  constructor(private importCategory: ImportCategoryUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    await this.importCategory.execute(file);

    return response.send();
  }
}

export { ImportCategoryController };
