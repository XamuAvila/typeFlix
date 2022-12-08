import { faker } from '@faker-js/faker';
import { CacheModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/createMovieDto';
import { UpdateMovieDto } from './dto/updateMovieDto';
import { Movie } from './entities/movie.entity';
import { MovieService } from './movie.service';


async function movieFactory(numberOfMovies: number): Promise<Movie[]> {
  const movies: Movie[] = [];
  for (let x = 0; x <= numberOfMovies; x++) {

    let movieCreate = new Movie();

    movieCreate.id = x;
    movieCreate.actors = faker.lorem.words(3).split(' ');
    movieCreate.isDeleted = false;
    movieCreate.name = faker.internet.userName();
    movieCreate.synopsis = faker.lorem.sentence(5)
    movieCreate.stars = Math.floor(Math.random() * 5);
    movieCreate.createdAt = new Date();
    movieCreate.updatedAt = new Date();

    movies.push(movieCreate);
  }

  return movies;
}

describe('MovieService', () => {
  let service: MovieService;
  let repo: Repository<Movie>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CacheModule.register({
          ttl: 5, // seconds
          max: 10,
          isGlobal: true,
        }),
      ],
      providers: [
        MovieService,
        {
          provide: getRepositoryToken(Movie),
          useValue: {
            findOneOrFail: jest.fn().mockResolvedValue(movieFactory(1)),
            find: jest.fn().mockReturnValue(movieFactory(2)),
            create: jest.fn().mockReturnValue(movieFactory(1)),
            save: jest.fn(),
            update: jest.fn().mockResolvedValue(true),
            delete: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<MovieService>(MovieService);
    repo = module.get<Repository<Movie>>(getRepositoryToken(Movie));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('getAll', () => {
    it('should return an array of movies', async () => {
      const repoSpy = jest.spyOn(repo, 'find');
      const movies = await service.getMovies();
      expect(repoSpy).toHaveBeenCalled();
    });
  });
  describe('getOne', () => {
    it('should get a single movie', async () => {
      const repoSpy = jest.spyOn(repo, 'findOneOrFail');
      const movies = await service.getMovie(1);
      expect(repoSpy).toBeCalledWith({ where: { id: 1, isDeleted: false } });
    });
  });

  describe('insert one', () => {
    it('should insert a movie', async () => {
      const genMovie: Movie[] = await movieFactory(1);
      const saveSpyOn = jest.spyOn(repo, 'save');

      const movieCreateDto: CreateMovieDto = {
        name: genMovie[0].name,
        actors: genMovie[0].actors,
        stars: genMovie[0].stars,
        synopsis: genMovie[0].synopsis
      }
      await service.createMovie(movieCreateDto);
      expect(saveSpyOn).toHaveBeenCalled();
    })
  })

  describe('Delete one', () => {
    it('should delete a movie', async () => {
      const updateSpy = jest.spyOn(repo, 'update');
      await service.deleteMovie(1);
      expect(updateSpy).toHaveBeenCalledWith({ id: 1 }, { isDeleted: true })
    })
  })

  describe('Update one', () => {
    it('should update a movie', async () => {
      const genMovie: Movie[] = await movieFactory(1);
      const updateSpy = jest.spyOn(repo, 'update');
      const updateParam: UpdateMovieDto = {
        name: genMovie[0].name,
        actors: genMovie[0].actors,
        stars: genMovie[0].stars,
        synopsis: genMovie[0].synopsis
      }
      await service.updateMovie(1, updateParam);
      expect(updateSpy).toHaveBeenCalledWith({ id: 1 }, updateParam)
    })
  })
});
