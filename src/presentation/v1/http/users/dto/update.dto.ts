import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { UserRole } from 'src/shared/user-role.enum';

export class UpdateUserDtoInput {
  @ApiProperty({ type: String, required: false, example: 'Rodrigo' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    type: String,
    required: false,
    example: 'novoemail@gmail.com',
  })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.toLowerCase())
  email?: string;

  @ApiProperty({ type: String, required: false, example: '12345678' })
  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string;

  @ApiProperty({ type: String, required: false, example: 'client' })
  @IsEnum(UserRole)
  @IsOptional()
  type?: UserRole;
}

export class UpdateUserDtoOutput {
  message: string;
}
