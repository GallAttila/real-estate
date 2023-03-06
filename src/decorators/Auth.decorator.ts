import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiAuthGuard } from 'src/auth/guard/api-auth.guard';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ApiKeyAuth } from './apiKey.decorator';

const Auth = () =>
  applyDecorators(
    ApiKeyAuth(),
    ApiBearerAuth(),
    UseGuards(JwtAuthGuard, ApiAuthGuard),
  );

export { Auth };
