import { OrderStatus } from 'src/shared/order-status.enum';

export interface UpdateOrderStatusApplicationInput {
  status: OrderStatus;
}

export interface UpdateOrderStatusApplicationOutput {
  message: string;
}
