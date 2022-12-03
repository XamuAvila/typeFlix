import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Encrypt } from 'src/shared/encrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    @InjectRepository(User)
    private readonly repository: Repository<User>;

    public async getUser(email: string): Promise<User> {
        return this.repository.findOne({ where: { email: email } });
    }

    public async createUser(body: CreateUserDto): Promise<User> {
        const user: User = new User();

        user.name = body.name;
        user.email = body.email;
        user.password = await Encrypt.encryptPassword(body.password);

        return this.repository.save(user);
    }
}
