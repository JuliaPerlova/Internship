import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ScheduleServiceModule } from './schedule.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(ScheduleServiceModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 8030,
    },
  });
  await app.listen(() => console.log('Microservice Schedule is listening'));
}
bootstrap();
