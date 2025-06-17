import * as yup from 'yup';
import { InferType } from 'yup';
import { ApiProperty } from '@nestjs/swagger';

export const loginUserSchema = yup.object().shape({
  email: yup
    .string()
    .email('O email é inválido.')
    .required('O email é obrigatório para login.')
    .transform((value: string) => (value ? value.toLowerCase() : value)),
  password: yup.string().required('A senha é obrigatória para login.'),
});

type LoginUserType = InferType<typeof loginUserSchema>;

export class LoginUserDtoInput implements LoginUserType {
  @ApiProperty({ type: String, example: 'admin@loomi.com.br' })
  email: string;

  @ApiProperty({ type: String, example: 'admin123' })
  password: string;
}
