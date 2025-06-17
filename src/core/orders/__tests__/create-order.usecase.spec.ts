import { Test, TestingModule } from '@nestjs/testing';
import { CreateOrderUsecase } from 'src/core/orders/usecases/create-order.usecase';
import { OrderRepository } from 'src/core/orders/repository/order.repository';
import {
  CreateOrderUsecaseInput,
  CreateOrderUsecaseOutput,
} from 'src/core/orders/interfaces/create-order.usecase.interface';
import { OrderStatus } from 'src/shared/order-status.enum';

describe('CreateOrderUsecase', () => {
  let usecase: CreateOrderUsecase;
  let repository: OrderRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateOrderUsecase,
        {
          provide: OrderRepository,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    usecase = module.get<CreateOrderUsecase>(CreateOrderUsecase);
    repository = module.get<OrderRepository>(OrderRepository);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  describe('execute', () => {
    it('should call repository.create with correct input and return the result', async () => {
      const input: CreateOrderUsecaseInput = {
        client_id: 1,
        total: 100.0,
      };
      const output: CreateOrderUsecaseOutput = {
        id: 1,
        client_id: 1,
        total: 100.0,
        status: OrderStatus.preparation,
        order_date: new Date(),
      };

      jest.spyOn(repository, 'create').mockResolvedValue(output as any);

      const result = await usecase.execute(input);

      expect(repository.create).toHaveBeenCalledWith({
        client_id: input.client_id,
        total: input.total,
      });
      expect(result).toEqual(output);
    });
  });
});
