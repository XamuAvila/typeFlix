import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Encrypt } from 'src/shared/libs/encrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await (await this.usersService.getUser(username))[0];
    const validPass = await Encrypt.validatePassword(pass, user.password);
    if (user && validPass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
