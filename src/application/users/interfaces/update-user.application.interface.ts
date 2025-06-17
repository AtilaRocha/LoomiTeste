import { UserRole } from 'src/shared/user-role.enum';

export interface UpdateUserApplicationInput {
  name?: string;
  email?: string;
  password?: string;
  type?: UserRole;
}

export interface UpdateUserApplicationOutput {
  message: string;
}
