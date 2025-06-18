import { UserRole } from 'src/shared/user-role.enum';

export interface CreateUserUsecaseInput {
  name: string;
  email: string;
  password: string;
  type: UserRole;
}

export interface CreateUserUsecaseOutput {
  id: number;
  name: string;
  email: string;
  password: string;
  type: UserRole;
  email_verified: boolean;
  created_at: Date;
  updated_at: Date;
}
