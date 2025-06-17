import { OrderStatus } from '@prisma/client';

export interface CreateOrderUsecaseInput {
  client_id: number;
  total: number;
}

export interface CreateOrderUsecaseOutput {
  id: number;
  client_id: number;
  status: OrderStatus;
  order_date: Date;
  total: number;
  updated_at: Date;
}
