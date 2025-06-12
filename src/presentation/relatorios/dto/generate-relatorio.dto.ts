import { IsDateString, IsNotEmpty } from 'class-validator';

export class GenerateRelatorioDto {
  @IsDateString()
  @IsNotEmpty()
  dataInicio: string;

  @IsDateString()
  @IsNotEmpty()
  dataFim: string;
}
