import {
    IsString,
    MaxLength,
    IsArray,
    IsInt,
    IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateMovieDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    public name?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    public synopsis?: string;

    @ApiProperty()
    @IsArray()
    @IsOptional()
    public actors?: string[];

    @ApiProperty()
    @IsInt()
    @IsOptional()
    public stars?: number;
}
