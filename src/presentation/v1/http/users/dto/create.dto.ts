import * as yup from 'yup';
import { InferType } from 'yup';
import { ApiProperty } from '@nestjs/swagger';

export const createUserSchema = yup.object().shape({
  name: yup
    .string()
    .required('O nome é obrigatório.')
    .min(3, 'O nome deve ter no mínimo 3 caracteres.'),
  email: yup
    .string()
    .email('O email é inválido.')
    .required('O email é obrigatório.')
    .transform((value: string) => (value ? value.toLowerCase() : value)),
  password: yup
    .string()
    .required('A senha é obrigatória.')
    .min(6, 'A senha deve ter no mínimo 6 caracteres.'),
});

type CreateUserType = InferType<typeof createUserSchema>;

export class CreateUserDtoInput implements CreateUserType {
  @ApiProperty({ type: String, example: 'SeuNome' })
  name: string;

  @ApiProperty({ type: String, example: 'seuemail@gmail.com' })
  email: string;

  @ApiProperty({ type: String, example: '12345678' })
  password: string;
}

export class CreateUserDtoOutput {
  message: string;
}
