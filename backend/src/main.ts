import { NestFactory, } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Sentry from '@sentry/node';
import * as cors from 'cors';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
require('dotenv').config();


async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  const corsOptions: CorsOptions = {
    origin: 'https://job-search-frontend-nu.vercel.app', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization','baggage','sentry-trace'],
  };
  app.enableCors(corsOptions);
  app.use(cors(corsOptions));

  const config = new DocumentBuilder()
    .setTitle('job-search')
    .setDescription('') 
    .setVersion('1.0')
    .addTag('')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); 

  Sentry.init({
    dsn: process.env.SENTRY_DNS
  });

  await app.listen(3000);

}
bootstrap();
