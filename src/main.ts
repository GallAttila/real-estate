import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SecuritySchemeType } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets('served');
  const config = new DocumentBuilder()
    .addApiKey(
      {
        type: process.env.SWAGGER_API_KEY_TYPE as SecuritySchemeType,
        name: process.env.API_KEY_NAME,
        in: process.env.API_KEY_IN,
      },
      process.env.SWAGGER_API_KEY_SECURITY_NAME,
    )
    .addBearerAuth()
    .setTitle('Real estate')
    .setDescription(
      `This page is stands for the Real Estate api documentation.\n API_KEY=${process.env.API_KEY}`,
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(3001);
}
bootstrap();
