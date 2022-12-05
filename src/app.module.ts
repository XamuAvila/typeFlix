import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './shared/typeorm/typeorm.service';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { MovieModule } from './movie/movie.module';
import { CommandModule } from 'nestjs-command';
import { MovieService } from './movie/movie.service';
import { MoviesCommand } from './movie/movie.command';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    UserModule,
    AuthModule,
    MovieModule,
    CommandModule
  ],
  controllers: [AppController],
  providers: [MoviesCommand]
})
export class AppModule { }
