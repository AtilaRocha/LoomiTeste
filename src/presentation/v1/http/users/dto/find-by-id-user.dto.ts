import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FindByIdDtoInput {
  @ApiProperty({ type: String, example: '1' })
  @IsString()
  id: number;
}
