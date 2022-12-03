import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from './auth/auth-guards/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { LoginDto } from './auth/dto/login.dto';
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Login')
@Controller()
export class AppController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Body() req: LoginDto) {
        return this.authService.login(req.email);
    }
}
