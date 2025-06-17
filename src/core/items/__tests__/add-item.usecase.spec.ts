import { Test, TestingModule } from '@nestjs/testing';
import { AddItemUsecase } from 'src/core/items/usecases/add-item.usecase';
import { ItemRepository } from 'src/core/items/repository/item.repository';
import {
  AddItemUsecaseInput,
  AddItemUsecaseOutput,
} from 'src/core/items/interfaces/add-item.usecase.interface';

describe('AddItemUsecase', () => {
  let usecase: AddItemUsecase;
  let repository: ItemRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddItemUsecase,
        {
          provide: ItemRepository,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    usecase = module.get<AddItemUsecase>(AddItemUsecase);
    repository = module.get<ItemRepository>(ItemRepository);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  describe('execute', () => {
    it('should call repository.create with correct input and return the result', async () => {
      const input: AddItemUsecaseInput = {
        order_id: 1,
        product_id: 1,
        quantity: 10,
        price_per_unit: 10,
        subtotal: 100.0,
      };
      const output: AddItemUsecaseOutput = {
        subtotal: 100,
      };

      jest.spyOn(repository, 'create').mockResolvedValue(output as any);

      const result = await usecase.execute(input);

      expect(repository.create).toHaveBeenCalledWith({ ...input });
      expect(result).toEqual(output);
    });
  });
});
