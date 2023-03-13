import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiAuthGuard } from 'src/auth/guard/api-auth.guard';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ApiKeyAuth } from './apiKey.decorator';

const Auth = (controller: string) =>
  applyDecorators(
    ApiTags(`${controller} (apiKey*, bearerToken*)`),
    ApiKeyAuth(),
    ApiBearerAuth(),
    UseGuards(JwtAuthGuard, ApiAuthGuard),
  );

export { Auth };
