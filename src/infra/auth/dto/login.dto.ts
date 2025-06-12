import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'O email fornecido é inválido.' })
  @IsNotEmpty({ message: 'O email não pode ser vazio.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'A senha não pode ser vazia.' })
  senha: string;
}
