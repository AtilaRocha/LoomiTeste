import * as yup from 'yup';
import { InferType } from 'yup';
import { ApiProperty } from '@nestjs/swagger';

export const deleteUserSchema = yup.object().shape({
  id: yup
    .number()
    .required('O ID é obrigatório para a exclusão.')
    .integer('O ID deve ser um número inteiro.')
    .positive('O ID deve ser um número positivo.'),
});

type DeleteUserType = InferType<typeof deleteUserSchema>;

export class DeleteUserDtoInput implements DeleteUserType {
  @ApiProperty({ type: Number, example: 12 })
  id: number;
}
