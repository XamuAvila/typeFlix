import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty({ name: 'name', type: 'string' })
  @IsString()
  @IsNotEmpty()
  public name: string;

  @ApiProperty({ name: 'email', type: 'string' })
  @IsEmail()
  public email: string;

  @ApiProperty({ name: 'password', type: 'string' })
  @IsString()
  public password: string;
}
