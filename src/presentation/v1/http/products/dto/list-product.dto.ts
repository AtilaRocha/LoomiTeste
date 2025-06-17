import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class ListProductDtoInput {
  @ApiProperty({ type: String, required: false, example: 'Nintendo Switch 2' })
  @IsString()
  @MaxLength(300)
  @IsOptional()
  @Transform(({ value }) => value.toLowerCase())
  name?: string;

  @ApiProperty({
    type: String,
    required: false,
    example: 'Descrição do produto.',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ type: Number, required: false, example: 42 })
  @IsOptional()
  price?: number;

  @ApiProperty({ type: Number, required: false, example: 100 })
  @IsOptional()
  quantity_stock?: number;
}

export class Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  quantity_stock: number;
  created_at: Date;
  updated_at: Date;
}

export class ListProductDtoOutput {
  products: Product[];
}
