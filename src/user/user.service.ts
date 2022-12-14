import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Encrypt } from 'src/shared/libs/encrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  public async getUser(email: string | null): Promise<User[]> {
    const foundUser: User[] = await this.userRepository.find({ where: { email: email } });
    if (!foundUser.length) {
      throw new NotFoundException("User not found");
    }
    return foundUser;
  }

  public async createUser(body: CreateUserDto): Promise<User> {
    const user: User = new User();

    user.name = body.name;
    user.email = body.email;
    user.password = await Encrypt.encryptPassword(body.password);

    return this.userRepository.save(user);
  }
}
