import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { SocialModule } from './social.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(SocialModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 8040,
    },
  });
  await app.listen(() => console.log('Microservice Social is listening'));
}
bootstrap();
