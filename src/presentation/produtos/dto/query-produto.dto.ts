import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class QueryProdutoDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  precoMin?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  precoMax?: number;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  disponivel?: boolean;
}
