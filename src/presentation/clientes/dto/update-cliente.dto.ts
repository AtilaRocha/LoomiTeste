import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateClienteDto {
  @IsOptional()
  @IsString()
  nomeCompleto?: string;

  @IsOptional()
  @IsString()
  contato?: string;

  @IsOptional()
  @IsString()
  endereco?: string;

  @IsOptional()
  @IsBoolean({ message: 'O status deve ser um booleano (true/false).' })
  status?: boolean;
}
