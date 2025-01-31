import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import config from './common/config';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  const documentConfig = new DocumentBuilder()
    .setTitle('E-Commerce API')
    .setDescription('Example of an E-Commerce Rest API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('docs', app, documentFactory);

  await app.listen(config().port);
}
void bootstrap();
