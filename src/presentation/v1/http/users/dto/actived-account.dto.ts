import * as yup from 'yup';
import { InferType } from 'yup';
import { ApiProperty } from '@nestjs/swagger';

export const activateAccountSchema = yup.object().shape({
  id: yup
    .string()
    .required('O ID é obrigatório.')
    .uuid('O ID deve ser um UUID válido.'),
  token: yup.string().required('O token de ativação é obrigatório.'),
});

type ActivateAccountType = InferType<typeof activateAccountSchema>;

export class ActivedAccountDtoInput implements ActivateAccountType {
  @ApiProperty({
    type: String,
    example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
  })
  id: string;

  @ApiProperty({ type: String, example: 'um-token-unico-de-ativacao' })
  token: string;
}
