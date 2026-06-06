import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173', // Exactly matches your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Required if you plan to send secure cookies or JWTs
  });
  
  app.useGlobalPipes(new ValidationPipe({whitelist:true}));
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
