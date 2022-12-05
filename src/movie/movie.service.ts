import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/createMovieDto';

@Injectable()
export class MovieService {
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>;

    async createMovie(movie: CreateMovieDto): Promise<Movie> {
        const newMovie = new Movie();

        newMovie.name = movie.name;
        newMovie.actors = movie.actors;
        newMovie.isDeleted = false;
        newMovie.stars = movie.stars;
        newMovie.synopsis = movie.synopsis;

        return this.movieRepository.save(newMovie)
    }

    async getMovie(id: number): Promise<Movie[]> {
        return this.movieRepository.find({ where: { id: id, isDeleted: false } });
    }

    async getMovieByName(name: string): Promise<Movie> {
        return this.movieRepository.findOne({ where: { name: name } })
    }

    async deleteMovie(id: number): Promise<{ message: string }> {
        const movie: Movie[] = await this.getMovie(id);
        movie[0].isDeleted = true;
        this.movieRepository.update({ id: id }, { isDeleted: true })
        return {
            "message": "Movie deleted"
        }
    }
}