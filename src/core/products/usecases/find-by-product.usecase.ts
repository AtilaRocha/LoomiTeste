import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'src/core/interfaces/IUsecase';
import { ProductRepository } from '../repository/product.repository';
import { FindByIdProductUsecaseInput } from '../interfaces/find-by-id-product.usecase.interface';
import { ProductEntity } from '../entity/product.entity';

@Injectable()
export class FindByIdProductUsecase
  implements IUseCase<FindByIdProductUsecaseInput, ProductEntity>
{
  constructor(
    @Inject(ProductRepository)
    private readonly _productRepository: ProductRepository,
  ) {}

  async execute(input: FindByIdProductUsecaseInput): Promise<ProductEntity> {
    const prismaProduct = await this._productRepository.findOne(input.id);

    if (!prismaProduct) {
      throw new Error('Product not found');
    }

    return new ProductEntity({
      id: prismaProduct.id,
      name: prismaProduct.name,
      description: prismaProduct.description,
      price: prismaProduct.price,
      quantity_stock: prismaProduct.quantity_stock,
      created_at: prismaProduct.created_at,
      updated_at: prismaProduct.updated_at,
    });
  }
}
