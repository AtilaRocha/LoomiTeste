import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductUsecase } from 'src/core/products/usecases/create-product.usecase';
import { ProductRepository } from 'src/core/products/repository/product.repository';
import {
  CreateProductUsecaseInput,
  CreateProductUsecaseOutput,
} from 'src/core/products/interfaces/create-product.usecase.interface';
describe('CreateProductUsecase', () => {
  let usecase: CreateProductUsecase;
  let mockProductRepository: Partial<jest.Mocked<ProductRepository>>;

  beforeEach(async () => {
    mockProductRepository = {
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
      findBy: jest.fn(),
    } as Partial<jest.Mocked<ProductRepository>>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateProductUsecase,
        {
          provide: ProductRepository,
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    usecase = module.get<CreateProductUsecase>(CreateProductUsecase);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  describe('execute', () => {
    it('should call repository.save with correct input and return the result', async () => {
      const input: CreateProductUsecaseInput = {
        name: 'Product A',
        description: 'test',
        price: 100,
        quantity_stock: 10,
      };

      // Usando 'any' para o tipo, já que a importação de Product está falhando
      const mockSavedProduct: any = {
        id: 1,
        name: input.name,
        description: input.description,
        price: input.price,
        quantity_stock: input.quantity_stock,
        created_at: new Date('2025-06-17T10:00:00Z'),
        updated_at: new Date('2025-06-17T10:00:00Z'),
      };

      const expectedOutput: CreateProductUsecaseOutput = {
        id: mockSavedProduct.id,
        name: mockSavedProduct.name,
        description: mockSavedProduct.description,
        price: mockSavedProduct.price,
        quantity_stock: mockSavedProduct.quantity_stock,
        created_at: mockSavedProduct.created_at,
        updated_at: mockSavedProduct.updated_at,
      };

      (mockProductRepository.save as jest.Mock).mockResolvedValue(
        mockSavedProduct,
      );

      const result = await usecase.execute(input);

      expect(mockProductRepository.save).toHaveBeenCalledWith(input);
      expect(result).toEqual(expectedOutput);
    });

    it('should throw an error if repository.save fails', async () => {
      const input: CreateProductUsecaseInput = {
        name: 'Product Error',
        description: 'error',
        price: 50,
        quantity_stock: 5,
      };

      const error = new Error('Database connection failed during product save');
      (mockProductRepository.save as jest.Mock).mockRejectedValue(error);

      await expect(usecase.execute(input)).rejects.toThrow(error);
      expect(mockProductRepository.save).toHaveBeenCalledWith(input);
    });
  });
});
