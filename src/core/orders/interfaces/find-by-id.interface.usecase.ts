import { OrderStatus } from '@prisma/client';

export interface FindByIdOrderUsecaseInput {
  id: number;
}

export interface FindByIdOrderUsecaseOutput extends FindByIdOrderUsecaseInput {
  total: number;
  status: OrderStatus;
}
