import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationUseCase {
  constructor(private specificationsRepository: ISpecificationsRepository) {}
  async execute({ name, description }: IRequest): Promise<void> {
    const specificationExists = this.specificationsRepository.findByName(name);

    if (specificationExists) {
      throw new Error('This specification already exists');
    }

    this.specificationsRepository.create({
      name,
      description,
    });
  }
}

export { CreateSpecificationUseCase };
