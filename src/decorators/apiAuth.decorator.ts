import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiAuthGuard } from 'src/auth/guard/api-auth.guard';
import { ApiKeyAuth } from './apiKey.decorator';

const ApiAuth = (controller: string) =>
  applyDecorators(
    ApiTags(`${controller} (apiKey*)`),
    ApiKeyAuth(),
    UseGuards(ApiAuthGuard),
  );

export { ApiAuth };
