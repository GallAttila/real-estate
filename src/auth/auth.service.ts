import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/types/user';
import { UsersService } from 'src/users/users.service';
import { UserCredentials } from './types/userCredentials';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    credentials: UserCredentials,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findOne(credentials.username);
    if (user && user.password === credentials.password) {
      user.password = undefined;
      return user;
    }
    return null;
  }

  async logIn(user: User) {
    return {
      access_token: this.jwtService.sign({ ...user }),
    };
  }
}
