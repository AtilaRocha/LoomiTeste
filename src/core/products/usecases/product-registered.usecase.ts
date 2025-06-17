import { IUseCase } from 'src/core/interfaces/IUsecase';
import { VerifyProductUsecaseInput } from '../interfaces/product-registered.usecase.interface';
import { ProductRepository } from '../repository/product.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class VerifyProductUsecase
  implements IUseCase<VerifyProductUsecaseInput, boolean>
{
  constructor(
    @Inject(ProductRepository)
    private readonly _productRepository: ProductRepository,
  ) {}
  async execute(input: VerifyProductUsecaseInput): Promise<boolean> {
    const product = await this._productRepository.findByName(input.name);
    return product?.name ? true : false;
  }
}
