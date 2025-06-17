import type { User, Client } from '@prisma/client';

export class UserEntity implements Partial<User> {
  id: number;
  name: string;
  email: string;
  password: string;
  type: 'admin' | 'client';
  email_verified: boolean;
  created_at: Date;
  updated_at: Date;

  client?: Client;

  constructor(input: Partial<UserEntity>) {
    Object.assign(this, input);
  }
}
