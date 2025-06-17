import type { User, Order } from '@prisma/client';

export class ClientEntity {
  id: number;
  userId: number;
  full_name: string;
  contact: string;
  address: string;
  status: boolean;
  created_at: Date;
  updated_at: Date;

  user?: User;
  orders?: Order[];

  constructor(input: Partial<ClientEntity>) {
    Object.assign(this, input);
  }
}
