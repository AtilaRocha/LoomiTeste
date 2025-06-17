import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'src/core/interfaces/IUsecase';
import { ProductRepository } from '../repository/product.repository';
import { DeleteProductUsecaseInput } from '../interfaces/delete-product.usecase.interface';

@Injectable()
export class DeleteProductUsecase
  implements IUseCase<DeleteProductUsecaseInput, void>
{
  constructor(
    @Inject(ProductRepository)
    private readonly _productRepository: ProductRepository,
  ) {}
  async execute(input: DeleteProductUsecaseInput): Promise<void> {
    await this._productRepository.delete(input.id);
  }
}
