import { ApiSecurity } from '@nestjs/swagger';

export const ApiKeyAuth = () => ApiSecurity('api-key'); // process.env.SWAGGER_API_KEY_SECURITY_NAME
