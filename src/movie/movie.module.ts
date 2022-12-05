import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { CacheModule } from '@nestjs/common/cache';
@Module({
  imports: [
    TypeOrmModule.forFeature([Movie])
  ],
  providers: [MovieService],
  controllers: [MovieController],
  exports: [MovieService]
})
export class MovieModule { }
