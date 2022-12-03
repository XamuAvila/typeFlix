import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(@Inject(UserService) private readonly userService: UserService) { }
    @Post()
    async createUser(@Body() user: CreateUserDto): Promise<User> {
        return await this.userService.createUser(user);
    }

    @Get(":id")
    async getUser(@Param('id') id: number): Promise<User> {
        return await this.userService.getUser(id);
    }
}
