import { OrderStatus } from '@prisma/client';
import { OrderWithRelations } from 'src/application/orders/interfaces/list-order.application.interface';

export interface ListOrderUsecaseInput {
  status?: OrderStatus;
  client_id?: number;
  total?: number;
}

export type ListOrderUsecaseOutput = OrderWithRelations[];
