import { UserRole } from 'src/shared/user-role.enum';

export interface ListUserUsecaseInput {
  name?: string;
  email?: string;
  type?: UserRole;
}

export interface User {
  id: number;
  name: string;
  email: string;
  type: UserRole;
  email_verified: boolean;
  created_at: Date;
  updated_at: Date;
}
