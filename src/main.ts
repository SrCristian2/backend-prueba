import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Logger, ValidationPipe } from '@nestjs/common';
import cors from '@fastify/cors';

async function bootstrap() {
  const adapterOptions = {
    logger: process.env.NODE_ENV !== 'production',
  };

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(adapterOptions),
  );

  app.register(cors, {
    origin: '*',
    methods: ['GET', 'PUT', 'OPTIONS', 'POST', 'DELETE'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const logger = new Logger('bootstrap');

  await app.listen({
    port: parseInt(process.env.PORT ?? '3000'),
    host: process.env.HOST || '0.0.0.0',
  });
  logger.log(`servidor corriendo por el puerto ${process.env.PORT}`);
}
bootstrap();
