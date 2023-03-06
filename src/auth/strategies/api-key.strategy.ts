import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(Strategy, 'api-key') {
  constructor() {
    super();
  }

  authenticate(req: Request): void {
    const apiKey = req[process.env.API_KEY_IN][process.env.API_KEY_NAME];
    if (apiKey !== process.env.API_KEY) {
      throw new UnauthorizedException();
    }
    return this.success(req.user);
  }
}
