import { UserRole } from 'src/shared/user-role.enum';

export interface ListUserApplicationInput {
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

export interface ListUserApplicationOutput {
  users: User[];
}
