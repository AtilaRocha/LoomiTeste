import { OrderStatus } from 'src/shared/order-status.enum';

export interface UpdateOrderUsecaseInput {
  id: number;
  total: number;
  status?: OrderStatus;
}
