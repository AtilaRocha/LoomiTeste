import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDtoInput {
  @ApiProperty({
    type: String,
    example: 'Nintendo Switch 2',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  @MinLength(2)
  @Transform(({ value }) => value.toLowerCase())
  name: string;

  @ApiProperty({
    type: String,
    example:
      'O console Nintendo Switch 2 combina a flexibilidade de jogar em qualquer lugar com o poder da nova geração para uma experiência de jogo superior e mais imersiva.',
  })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  description: string;

  @ApiProperty({ type: Number, example: 4299 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01, { message: 'Price must be greater than or equal to 0' })
  @IsNotEmpty()
  @Transform(({ value }) => {
    if (typeof value === 'number') {
      return parseFloat(value.toFixed(2));
    }
    return value;
  })
  price: number;

  @ApiProperty({ type: Number, example: 10 })
  @IsInt()
  @Min(1, { message: 'Quantity in Stock must be greater than or equal to 1' })
  @IsNotEmpty()
  quantity_stock: number;
}

export class CreateProductDtoOutput {
  message: string;
}
