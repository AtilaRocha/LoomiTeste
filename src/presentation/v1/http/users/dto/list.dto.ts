import * as yup from 'yup';
import { InferType } from 'yup';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/shared/user-role.enum';

export const listUserSchema = yup.object().shape({
  name: yup.string().optional(),
  email: yup.string().email('O email é inválido.').optional(),
  type: yup
    .string()
    .oneOf(Object.values(UserRole), 'Tipo de usuário inválido.')
    .optional(),
  page: yup
    .number()
    .integer('A página deve ser um número inteiro.')
    .min(1, 'A página deve ser no mínimo 1.')
    .default(1)
    .optional(),
  limit: yup
    .number()
    .integer('O limite deve ser um número inteiro.')
    .min(1, 'O limite deve ser no mínimo 1.')
    .default(10)
    .optional(),
});

type ListUserType = InferType<typeof listUserSchema>;

export class ListUserDtoInput implements ListUserType {
  @ApiProperty({ type: String, required: false })
  name?: string;

  @ApiProperty({ type: String, required: false })
  email?: string;

  @ApiProperty({ type: String, required: false, enum: UserRole })
  type?: UserRole;

  @ApiProperty({
    type: Number,
    example: 1,
    required: false,
    description: 'Número da página',
  })
  page?: number;

  @ApiProperty({
    type: Number,
    example: 10,
    required: false,
    description: 'Limite de itens por página',
  })
  limit?: number;
}

export class User {
  id: number;
  name: string;
  email: string;
  type: UserRole;
  email_verified: boolean;
  created_at: Date;
  updated_at: Date;
}

export class ListUserDtoOutput {
  @ApiProperty({ type: [User] })
  users: User[];
}
