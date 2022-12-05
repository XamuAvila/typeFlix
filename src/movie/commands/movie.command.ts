import { Command, Positional, Option } from 'nestjs-command';
import { Inject, Injectable } from '@nestjs/common';
import { MovieService } from '../movie.service';
import { faker } from '@faker-js/faker';


@Injectable()
export class MoviesCommand {
    constructor(@Inject(MovieService) private readonly movieService: MovieService) { }

    @Command({
        command: 'create:movie',
        describe: 'create movies',
    })
    async create() {
        for (let x = 0; x <= 50000; x++) {
            const name = faker.lorem.words(2);
            const movie = await this.movieService.getMovieByName(name);
            if (!movie) {
                await this.movieService.createMovie({
                    name: name,
                    actors: faker.lorem.words(3).split(" "),
                    stars: Math.floor(Math.random() * 10),
                    synopsis: faker.lorem.sentence(5)
                });
            }
        }
    }
}
