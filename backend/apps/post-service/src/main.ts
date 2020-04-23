import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { PostModule } from './post.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(PostModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 8060,
    },
  });
  await app.listen(() => console.log('Microservice Posts is listening'));
}
bootstrap();
