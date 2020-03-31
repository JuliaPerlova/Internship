import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { UserModule } from './user.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(UserModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 8090,
    },
  });
  await app.listen(() => console.log('Microservice User is listening'));
}
bootstrap();
