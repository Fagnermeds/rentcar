import { parse } from 'csv-parse';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';

import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  private loadCategories(
    file: Express.Multer.File
  ): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const categories: IImportCategory[] = [];
      const stream = fs.createReadStream(file.path);
      const parser = parse();

      stream.pipe(parser);

      parser
        .on('data', async (line) => {
          const [name, description] = line;

          categories.push({
            name,
            description,
          });
        })
        .on('end', () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on('error', (error) => reject(error));
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);
    const promises = [];

    for (const category of categories) {
      promises.push(this.create(category));
    }

    await Promise.all(promises);
  }

  private async create(category: IImportCategory): Promise<void> {
    const { name, description } = category;
    const categoryExists = await this.categoriesRepository.findByName(name);

    if (!categoryExists) {
      await this.categoriesRepository.create({ name, description });
    }
  }
}

export { ImportCategoryUseCase };
