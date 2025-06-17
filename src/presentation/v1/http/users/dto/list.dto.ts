import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserRole } from 'src/shared/user-role.enum';

export class ListUserDtoInput {
  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty({ type: String, required: false })
  @IsEnum(UserRole)
  @IsNotEmpty()
  @IsOptional()
  type?: UserRole;
}

export class User {
  id: number;
  name: string;
  email: string;
  type: UserRole;
  email_verified: boolean;
  created_at: Date;
  updated_at: Date;
}

export class ListUserDtoOutput {
  users: User[];
}
