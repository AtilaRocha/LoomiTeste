import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginUserDtoInput {
  @ApiProperty({ type: String, example: 'admin@loomi.com.br' })
  @IsString()
  email: string;

  @ApiProperty({ type: String, example: 'admin123' })
  @IsString()
  password: string;
}
