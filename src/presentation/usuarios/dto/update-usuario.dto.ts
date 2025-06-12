import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { TipoUsuario } from '@prisma/client';

export class UpdateUsuarioDto {
  @IsOptional()
  @IsString({ message: 'O nome deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  nome?: string;

  @IsOptional()
  @IsEmail({}, { message: 'O email fornecido é inválido.' })
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
  senha?: string;

  @IsOptional()
  @IsEnum(TipoUsuario, { message: 'Tipo de usuário inválido.' })
  tipo?: TipoUsuario;
}
