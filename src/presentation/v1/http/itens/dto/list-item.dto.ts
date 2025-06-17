import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumberString } from 'class-validator';

export class ListItemDtoInput {
  @ApiProperty({ type: Number, required: false, example: 1 })
  @IsOptional()
  @IsNumberString()
  order_id?: number;

  @ApiProperty({ type: Number, required: false, example: 1 })
  @IsOptional()
  @IsNumberString()
  product_id?: number;

  @ApiProperty({ type: Number, required: false, example: 1 })
  @IsOptional()
  @IsNumberString()
  quantity?: number;

  @ApiProperty({ type: Number, required: false, example: 1 })
  @IsOptional()
  @IsNumberString()
  price_per_unit?: number;

  @ApiProperty({ type: Number, required: false, example: 1 })
  @IsOptional()
  @IsNumberString()
  subtotal?: number;
}

export class Item {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price_per_unit: number;
  subtotal: number;
  created_at: Date;
  updated_at: Date;
}

export class ListItemDtoOutput {
  items: Item[];
}
