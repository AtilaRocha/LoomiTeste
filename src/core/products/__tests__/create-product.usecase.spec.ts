import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductUsecase } from 'src/core/products/usecases/create-product.usecase';
import { ProductRepository } from 'src/core/products/repository/product.repository';
import {
  CreateProductUsecaseInput,
  CreateProductUsecaseOutput,
} from 'src/core/products/interfaces/create-product.usecase.interface';

describe('CreateProductUsecase', () => {
  let usecase: CreateProductUsecase;
  let repository: ProductRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateProductUsecase,
        {
          provide: ProductRepository,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    usecase = module.get<CreateProductUsecase>(CreateProductUsecase);
    repository = module.get<ProductRepository>(ProductRepository);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  describe('execute', () => {
    it('should call repository.create with correct input and return the result', async () => {
      const input: CreateProductUsecaseInput = {
        name: 'Product A',
        description: 'test',
        price: 100,
        quantity_stock: 10,
      };
      const output: CreateProductUsecaseOutput = {
        id: 1,
        created_at: new Date(),
        updated_at: new Date(),
        ...input,
      };

      jest.spyOn(repository, 'create').mockResolvedValue(output as any);

      const result = await usecase.execute(input);

      expect(repository.create).toHaveBeenCalledWith(input);
      expect(result).toEqual(output);
    });
  });
});
