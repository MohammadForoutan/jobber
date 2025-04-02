import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginInput } from './dto/login.input';
import { Response } from 'express';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './token-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}
  async login(loginInput: LoginInput, res: Response) {
    const user = await this.verifyUser(loginInput.email, loginInput.password);

    const expires = new Date();
    const expiresInMs =
      this.configService.getOrThrow<string>('JWT_EXPIRATION_MS');
    expires.setMilliseconds(expires.getTime() + parseInt(expiresInMs));

    const tokenPayload: TokenPayload = {
      userId: user.id,
    };

    const accessToken = this.jwtService.sign(tokenPayload);
    res.cookie('Authentication', accessToken, {
      httpOnly: true, // cannot be accessed by client-side scripts
      secure:
        this.configService.getOrThrow<string>('NODE_ENV') === 'production', // encrypted and only sent over https
      expires,
    });

    return user;
  }

  private async verifyUser(email: string, password: string) {
    try {
      const user = await this.usersService.getUser({ email });
      const authenticated = await bcrypt.compare(password, user.password);

      if (!authenticated) {
        throw new UnauthorizedException();
      }

      return user;
    } catch (_error) {
      throw new UnauthorizedException('Invalid Credentials');
    }
  }
}
