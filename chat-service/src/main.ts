import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import cors from 'cors';
import { AppModule } from './app.module';
import { RedisIoAdapter, SocketIoAdapter } from './common/util/redis-io-adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //app.useWebSocketAdapter(new SocketIoAdapter(app, true));
  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIoAdapter);

  await app.listen(3000);
}
bootstrap();
