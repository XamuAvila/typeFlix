import { IsString, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
export class LoginDto {
    @ApiProperty({ name: 'email', type: 'string' })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({ name: 'password', type: 'string' })
    @IsString()
    @IsNotEmpty()
    password: string;
}
