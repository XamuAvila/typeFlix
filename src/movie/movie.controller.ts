import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/createMovieDto';
import { Movie } from './entities/movie.entity';
import { MovieService } from './movie.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/auth-guards/jwt-auth.guard';
import { Put } from '@nestjs/common/decorators';
import { UpdateMovieDto } from './dto/updateMovieDto';

@ApiTags('Movie')
@Controller('movie')
export class MovieController {
  constructor(@Inject(MovieService) private movieService: MovieService) { }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Post()
  async createMovie(@Body() movie: CreateMovieDto): Promise<Movie> {
    return await this.movieService.createMovie(movie);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Get(':id')
  async getMovie(@Param('id') id: number): Promise<Movie[]> {
    return await this.movieService.getMovie(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Get()
  async getMovies(): Promise<Movie[]> {
    return await this.movieService.getMovies();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Delete(':id')
  async deleteMovie(@Param('id') id: number): Promise<{ message: string }> {
    return await this.movieService.deleteMovie(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Put(':id')
  async updateMovie(@Param('id') id: number, @Body() movie: UpdateMovieDto): Promise<{ message: string }> {
    return await this.movieService.updateMovie(id, movie);
  }
}
