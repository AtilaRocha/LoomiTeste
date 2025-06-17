import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class DeleteOrderDtoInput {
  @ApiProperty({ type: Number, example: 1 })
  @IsNumberString()
  id: number;
}
