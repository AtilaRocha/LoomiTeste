import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DeleteProductDtoInput {
  @ApiProperty({ type: Number, example: 12 })
  @IsString()
  id: number;
}
