import { OrderStatus } from 'src/shared/order-status.enum';

export interface CreateOrderUsecaseInput {
  client_id: number;
  total: number;
  status?: OrderStatus;
  order_date?: Date;
}

export interface CreateOrderUsecaseOutput {
  id: number;
  client_id: number;
  total: number;
  status: OrderStatus;
  order_date: Date;
  updated_at: Date;
  created_at: Date;
}
