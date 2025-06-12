import { IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdateProdutoDto {
  @IsOptional()
  @IsString()
  nomeDoProduto?: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  preco?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  quantidadeEmEstoque?: number;
}
