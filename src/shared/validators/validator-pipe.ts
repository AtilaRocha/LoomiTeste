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
    if (type !== 'body' && type !== 'query' && type !== 'param') {
      return value;
    }

    try {
      const validatedValue = await this.schema.validate(value, {
        abortEarly: false,
        stripUnknown: true,
      });
      return validatedValue;
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errors = error.inner.map((err) => ({
          path: err.path,
          message: err.message,
          value: err.value,
        }));
        throw new BadRequestException(errors);
      }
      throw new BadRequestException('Erro de validação desconhecido.');
    }
  }
}
