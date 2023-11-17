import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import * as process from 'process';
import { ErrorExceptionFilter } from './filters/exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ErrorExceptionFilter());
  app.enableCors();
  await app.listen(process.env.PORT || 3001);
}

void bootstrap();
