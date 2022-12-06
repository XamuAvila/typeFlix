import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LoginDto {
  @ApiProperty({ name: 'email', type: 'string' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ name: 'password', type: 'string' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
