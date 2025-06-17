import * as yup from 'yup';
import { InferType } from 'yup';
import { ApiProperty } from '@nestjs/swagger';

export const findByIdUserSchema = yup.object().shape({
  id: yup
    .number()
    .required('O ID é obrigatório para a busca.')
    .integer('O ID deve ser um número inteiro.')
    .positive('O ID deve ser um número positivo.'),
});

type FindByIdUserType = InferType<typeof findByIdUserSchema>;

export class FindByIdDtoInput implements FindByIdUserType {
  @ApiProperty({ type: Number, example: 1 })
  id: number;
}
