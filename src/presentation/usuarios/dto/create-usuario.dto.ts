import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { TipoUsuario } from '@prisma/client';

export class CreateUsuarioDto {
  @ApiProperty({
    description: 'Nome completo do usuário.',
    example: 'João da Silva',
  })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({
    description: 'Endereço de e-mail único do usuário.',
    example: 'joao.silva@email.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Senha do usuário, com no mínimo 6 caracteres.',
    example: '123456',
  })
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  senha: string;

  @ApiProperty({
    description: 'Tipo de acesso do usuário.',
    enum: TipoUsuario,
    example: TipoUsuario.CLIENTE,
  })
  @IsEnum(TipoUsuario)
  @IsNotEmpty()
  tipo: TipoUsuario;
}