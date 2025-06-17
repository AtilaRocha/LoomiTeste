import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateProductDtoInput {
  @ApiProperty({ type: String, required: false, example: 'Arroz' })
  @IsString()
  @IsOptional()
  @MaxLength(300)
  @MinLength(2)
  @Transform(({ value }) => value.toLowerCase())
  name?: string;

  @ApiProperty({
    type: String,
    required: false,
    example: 'Descrição de um produto',
  })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.toLowerCase())
  description?: string;

  @ApiProperty({ type: Number, required: false, example: 1 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01, { message: 'Price must be greater than or equal to 0' })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'number') {
      return parseFloat(value.toFixed(2));
    }
    return value;
  })
  price?: number;

  @ApiProperty({ type: Number, required: false, example: 1 })
  @IsOptional()
  @Min(0, { message: 'Quantity in Stock must be greater than or equal to 0' })
  quantity_stock?: number;
}

export class UpdateProductDtoOutput {
  message: string;
}
