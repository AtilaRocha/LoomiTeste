import { Test, TestingModule } from '@nestjs/testing';
import { AddItemUsecase } from '../usecases/add-item.usecase';
import { ItemRepository } from '../repository/item.repository';
import {
  AddItemUsecaseInput,
  AddItemUsecaseOutput,
} from '../interfaces/add-item.usecase.interface';
import { ItemEntity } from '../entity/item.entity';

describe('AddItemUsecase', () => {
  let usecase: AddItemUsecase;
  let mockItemRepository: Partial<jest.Mocked<ItemRepository>>;

  beforeEach(async () => {
    mockItemRepository = {
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
      findBy: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddItemUsecase,
        {
          provide: ItemRepository,
          useValue: mockItemRepository,
        },
      ],
    }).compile();

    usecase = module.get<AddItemUsecase>(AddItemUsecase);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  describe('execute', () => {
    it('should call repository.save with correct input and return the result', async () => {
      const input: AddItemUsecaseInput = {
        order_id: 1,
        product_id: 101,
        quantity: 2,
        price_per_unit: 25.0,
        subtotal: 50.0,
      };

      const mockSavedItem: ItemEntity = {
        id: 1,
        order_id: input.order_id,
        product_id: input.product_id,
        quantity: input.quantity,
        price_per_unit: input.price_per_unit,
        subtotal: input.subtotal,
        created_at: new Date('2025-06-17T10:00:00Z'),
        updated_at: new Date('2025-06-17T10:00:00Z'),
      };

      const expectedUsecaseOutput: AddItemUsecaseOutput = {
        id: mockSavedItem.id,
        order_id: mockSavedItem.order_id,
        product_id: mockSavedItem.product_id,
        quantity: mockSavedItem.quantity,
        price_per_unit: mockSavedItem.price_per_unit,
        subtotal: mockSavedItem.subtotal,
        created_at: mockSavedItem.created_at,
        updated_at: mockSavedItem.updated_at,
      };

      (mockItemRepository.save as jest.Mock).mockResolvedValue(mockSavedItem);

      const result = await usecase.execute(input);

      expect(mockItemRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          order_id: input.order_id,
          product_id: input.product_id,
          quantity: input.quantity,
          price_per_unit: input.price_per_unit,
          subtotal: input.subtotal,
        }),
      );
      expect(result).toEqual(expectedUsecaseOutput);
    });

    it('should throw an error if repository.save fails', async () => {
      const input: AddItemUsecaseInput = {
        order_id: 1,
        product_id: 101,
        quantity: 2,
        price_per_unit: 25.0,
        subtotal: 50.0,
      };
      const error = new Error('Database error during item saving');
      (mockItemRepository.save as jest.Mock).mockRejectedValue(error);

      await expect(usecase.execute(input)).rejects.toThrow(error);
      expect(mockItemRepository.save).toHaveBeenCalled();
    });
  });
});
