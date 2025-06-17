import { UserRole } from 'src/shared/user-role.enum';

export interface CreateUserApplicationInput {
  name: string;
  email: string;
  password: string;
  type: UserRole;
}

export interface CreateUserApplicationOutput {
  message: string;
}
