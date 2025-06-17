import { YupValidationPipe } from '../validators/validator-pipe';
import * as yup from 'yup';
export function createPipe(dto: yup.AnyObjectSchema) {
  return new YupValidationPipe(dto);
}

export function createPipeParam(dto: yup.AnyObjectSchema) {
  return new YupValidationPipe(dto);
}

export function createPipeQuery(dto: yup.AnyObjectSchema) {
  return new YupValidationPipe(dto);
}
