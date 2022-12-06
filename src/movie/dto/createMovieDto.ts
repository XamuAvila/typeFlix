import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsArray,
  IsInt,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateMovieDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  public name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  public synopsis: string;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  public actors: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  public stars: number;
}
