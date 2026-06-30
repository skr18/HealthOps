import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import * as dotenv from 'dotenv';
import helmet from 'helmet';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- SECURITY ---
  // Helmet sets crucial HTTP headers to protect against common web vulnerabilities
  app.use(helmet());

  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Required if you plan to send secure cookies or JWTs
  });

  // --- ROUTING & VERSIONING ---
  // This creates the base '/api' route
  app.setGlobalPrefix('api');

  // This automatically inserts '/v1', '/v2' into the URL based on your controller decorators
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1', // Optional: Applies v1 automatically if you forget the @Version decorator
  });

  // --- VALIDATION ---
  // This ensures incoming JSON perfectly matches your DTOs and strips out malicious/extra fields
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,             // Strips properties that do not have decorators
      forbidNonWhitelisted: true,  // Throws an error if unknown properties are sent
      transform: true,             // Automatically converts string payloads to their correct types (e.g., numbers)
    }),
  );

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
