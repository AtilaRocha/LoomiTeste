import { IsInt, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateProdutoDto {
  @IsString()
  @IsNotEmpty()
  nomeDoProduto: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  preco: number;

  @IsInt()
  @Min(0)
  quantidadeEmEstoque: number;
}
