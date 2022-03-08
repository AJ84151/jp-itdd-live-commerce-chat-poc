import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import cors from 'cors';
import { AppModule } from './app.module';
import { SocketIoAdapter } from './common/util/redis-io-adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useWebSocketAdapter(new SocketIoAdapter(app, true));
  // const redisIoAdapter = new RedisIoAdapter(app);
  // await redisIoAdapter.connectToRedis();
  // app.useWebSocketAdapter(redisIoAdapter);

  // app.use((req, res, next) => {
  //   res.header('Access-Control-Allow-Origin', '*');
  //   res.header('Access-Control-Allow-Methods', 'OPTIONS,POST,GET,PUT,DELETE,PATCH');
  //   res.header('Access-Control-Allow-Headers', '*');
  //   res.header('Access-Control-Allow-Credentials', 'false');
  //   next();
  // });

  // const corsOptions = {
  //   origin: 'http://127.0.0.1:5501',
  //   credentials: true,

  // }
  // app.use(cors(corsOptions));

  //app.use(cors({ credentials: true, origin: 'http://127.0.0.1:5501/' }));

  await app.listen(3000);

  //https://docs.nestjs.com/microservices/redis#context

  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
  //   transport: Transport.REDIS,
  //   options: {
  //     url: 'redis://localhost:6379',
  //   },
  // });

  // await app.listen(()=>{ console.log("running")});

}
bootstrap();
