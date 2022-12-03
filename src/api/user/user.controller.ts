import { Body, Controller, Get, Inject, Param, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth-guards/jwt-auth.guard';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { ApiBearerAuth } from '@nestjs/swagger'
@Controller('user')
export class UserController {
    constructor(@Inject(UserService) private readonly userService: UserService) { }
    @Post()
    async createUser(@Body() user: CreateUserDto): Promise<User> {
        return await this.userService.createUser(user);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('JWT-auth')
    async getUser(@Query('email') email: string): Promise<User> {
        return await this.userService.getUser(email);
    }
}
