import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(Strategy, 'api-key') {
  constructor() {
    super();
  }

  authenticate(request: Request): void {
    const apiKey = request[process.env.API_KEY_IN][process.env.API_KEY_NAME];
    if (apiKey !== process.env.API_KEY) {
      throw new UnauthorizedException();
    }
    return this.pass();
  }
}
