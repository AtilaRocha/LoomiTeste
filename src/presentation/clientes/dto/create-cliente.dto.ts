import { IsNotEmpty, IsString } from 'class-validator';

export class CreateClienteDto {
  // O id do usuário será pego do token JWT do usuário autenticado.

  @IsString()
  @IsNotEmpty({ message: 'O nome completo não pode ser vazio.' })
  nomeCompleto: string;

  @IsString()
  @IsNotEmpty({ message: 'O contato não pode ser vazio.' })
  contato: string;

  @IsString()
  @IsNotEmpty({ message: 'O endereço não pode ser vazio.' })
  endereco: string;
}
