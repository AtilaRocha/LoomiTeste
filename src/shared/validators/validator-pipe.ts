import * as yup from 'yup';
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class YupValidationPipe implements PipeTransform<any> {
  constructor(private schema: yup.AnyObjectSchema) {}

  async transform(value: any, { type }: ArgumentMetadata) {
    console.log('--- YupValidationPipe LOGS (Inside Pipe) ---');
    console.log('Valor recebido no pipe:', value);
    console.log('Tipo de metadados:', type);

    if (type !== 'body' && type !== 'query' && type !== 'param') {
      return value;
    }

    try {
      const validatedValue = await this.schema.validate(value, {
        abortEarly: false,
        stripUnknown: true,
      });
      console.log('Valor VALIDADO pelo Yup:', validatedValue);
      return validatedValue;
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errors = error.inner.map((err) => ({
          path: err.path,
          message: err.message,
          value: err.value,
        }));
        console.error('Erro de validação no Yup:', errors);
        throw new BadRequestException(errors);
      }
      console.error('Erro de validação desconhecido no YupPipe:', error);
      throw new BadRequestException('Erro de validação desconhecido.');
    }
  }
}
