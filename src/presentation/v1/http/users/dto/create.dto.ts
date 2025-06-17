import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDtoInput {
  @ApiProperty({ type: String, example: 'SeuNome' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String, example: 'seuemail@gmail.com' })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @ApiProperty({ type: String, example: '12345678' })
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;
}

export class CreateUserDtoOutput {
  message: string;
}
