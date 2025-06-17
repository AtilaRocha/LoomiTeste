import { UserRole } from 'src/shared/user-role.enum';

export interface ClientUserHttpApplicationInput {
  id: number;
  name: string;
  email: string;
  type: UserRole;
  email_verified: boolean;
}
