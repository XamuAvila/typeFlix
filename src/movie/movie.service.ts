import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Movie } from './entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/createMovieDto';
import { InternalServerErrorException } from '@nestjs/common/exceptions';
import { UpdateMovieDto } from './dto/updateMovieDto';
@Injectable()
export class MovieService {
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>;
    private readonly cacheKey: string = 'movies:all';
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) { }

    async createMovie(movie: CreateMovieDto): Promise<Movie> {
        const newMovie = new Movie();

        newMovie.name = movie.name;
        newMovie.actors = movie.actors;
        newMovie.isDeleted = false;
        newMovie.stars = movie.stars;
        newMovie.synopsis = movie.synopsis;

        return this.movieRepository.save(newMovie);
    }

    async getMovie(id: number): Promise<Movie[]> {
        try {
            const foundMovie: Movie = await this.movieRepository.findOneOrFail({ where: { id: id, isDeleted: false } });

            return [foundMovie];
        } catch (error) {
            throw new NotFoundException("Movie not found");
        }
    }

    async getMovies(): Promise<Movie[]> {
        var movies: Movie[] = [];

        const cachedMovies = await this.cacheManager.get<string>(this.cacheKey);

        if (cachedMovies) {
            movies = JSON.parse(cachedMovies);
        } else {
            movies = await this.movieRepository.find();
            await this.cacheManager.set(this.cacheKey, JSON.stringify(movies));
        }

        if (!movies.length) {
            throw new NotFoundException("There is no movies in Database")
        }

        return movies;
    }

    async getMovieByName(name: string): Promise<Movie> {
        const movie: Movie = await this.movieRepository.findOne({ where: { name: name } });
        return movie;
    }

    async deleteMovie(id: number): Promise<{ message: string }> {
        await this.cacheManager.del(this.cacheKey);
        const movie: Movie[] = await this.getMovie(id);
        movie[0].isDeleted = true;
        this.movieRepository.update({ id: id }, { isDeleted: true });
        return {
            message: 'Movie deleted',
        };
    }

    async updateMovie(id: number, movie: UpdateMovieDto): Promise<{ message: string }> {
        try {
            await this.movieRepository.update({ id: id }, movie);
            return {
                message: "Movie updated successfully"
            }
        } catch (error) {
            throw new InternalServerErrorException("Error on updating movie");
        }
    }
}
