import * as yup from 'yup';
import { InferType } from 'yup';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/shared/user-role.enum';

export const updateUserSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'O nome deve ter no mínimo 3 caracteres.')
    .optional(),
  email: yup
    .string()
    .email('O email é inválido.')
    .optional()
    .transform((value: string) => (value ? value.toLowerCase() : value)),
  password: yup
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres.')
    .optional(),
  type: yup
    .string()
    .oneOf(Object.values(UserRole), 'Tipo de usuário inválido.')
    .optional(),
});

type UpdateUserType = InferType<typeof updateUserSchema>;

export class UpdateUserDtoInput implements UpdateUserType {
  @ApiProperty({ type: String, required: false, example: 'Rodrigo' })
  name?: string;

  @ApiProperty({
    type: String,
    required: false,
    example: 'novoemail@gmail.com',
  })
  email?: string;

  @ApiProperty({ type: String, required: false, example: '12345678' })
  password?: string;

  @ApiProperty({ type: String, required: false, example: 'client' })
  type?: UserRole;
}

export class UpdateUserDtoOutput {
  message: string;
}
