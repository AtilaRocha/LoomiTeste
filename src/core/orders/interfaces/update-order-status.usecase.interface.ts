import { OrderStatus } from 'src/shared/order-status.enum';

export interface UpdateOrderStatusUsecaseInput {
  id: number;
  status: OrderStatus;
}
