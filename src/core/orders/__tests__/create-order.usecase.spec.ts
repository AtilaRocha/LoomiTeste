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
  let mockOrderRepository: Partial<jest.Mocked<OrderRepository>>;

  beforeEach(async () => {
    mockOrderRepository = {
      create: jest.fn(),
    } as Partial<jest.Mocked<OrderRepository>>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateOrderUsecase,
        {
          provide: OrderRepository,
          useValue: mockOrderRepository,
        },
      ],
    }).compile();

    usecase = module.get<CreateOrderUsecase>(CreateOrderUsecase);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  describe('execute', () => {
    it('should call repository.create with correct input and return the result', async () => {
      const input: CreateOrderUsecaseInput = {
        client_id: 1,
        total: 100.0,
        status: OrderStatus.preparation,
        order_date: new Date(),
      };

      const mockCreatedOrder: any = {
        id: 1,
        client_id: input.client_id,
        total: input.total,
        status: OrderStatus.preparation,
        order_date: new Date('2025-06-17T10:00:00Z'),
        created_at: new Date('2025-06-17T10:00:00Z'),
        updated_at: new Date('2025-06-17T10:00:00Z'),
      };

      const expectedOutput: CreateOrderUsecaseOutput = {
        id: mockCreatedOrder.id,
        client_id: mockCreatedOrder.client_id,
        total: mockCreatedOrder.total,
        status: mockCreatedOrder.status,
        order_date: mockCreatedOrder.order_date,
        created_at: mockCreatedOrder.created_at,
        updated_at: mockCreatedOrder.updated_at,
      };

      (mockOrderRepository.create as jest.Mock).mockResolvedValue(
        mockCreatedOrder,
      );

      const result = await usecase.execute(input);

      expect(mockOrderRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          client: { connect: { id: input.client_id } },
          total: input.total,
          status: input.status,
          order_date: input.order_date,
        }),
      );
      expect(result).toEqual(expectedOutput);
    });

    it('should throw an error if repository.create fails', async () => {
      const input: CreateOrderUsecaseInput = {
        client_id: 1,
        total: 100.0,
        status: OrderStatus.preparation,
        order_date: new Date(),
      };

      const error = new Error('Database connection failed');
      (mockOrderRepository.create as jest.Mock).mockRejectedValue(error);

      await expect(usecase.execute(input)).rejects.toThrow(error);
      expect(mockOrderRepository.create).toHaveBeenCalled();
    });
  });
});
