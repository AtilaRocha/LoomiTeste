import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';

export enum TipoUsuario {
  Admin = 'Admin',
  Cliente = 'Cliente',
}

export class CreateUsuarioDto {
  @IsString({ message: 'O nome deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  nome: string;

  @IsEmail({}, { message: 'O email fornecido é inválido.' })
  @IsNotEmpty({ message: 'O email não pode ser vazio.' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
  @IsNotEmpty({ message: 'A senha não pode ser vazia.' })
  senha: string;

  @IsEnum(TipoUsuario, { message: 'Tipo de usuário inválido.' })
  tipo: TipoUsuario;
}