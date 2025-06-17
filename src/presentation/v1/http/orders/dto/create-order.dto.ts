import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';

export class Product {
  @IsInt()
  @IsNotEmpty()
  product_id: number;
  @IsInt()
  @IsNotEmpty()
  quantity: number;
}

export class CreateOrderDtoInput {
  @ApiProperty({ type: Array, example: [] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Product)
  @ArrayNotEmpty()
  products: Product[];
}

export class CreateOrderDtoOutput {
  message: string;
}
