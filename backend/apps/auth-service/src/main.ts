import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AuthModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 8080,
    },
  });

  await app.listen(() => console.log('Microservice Auth is listening'));
}
bootstrap();