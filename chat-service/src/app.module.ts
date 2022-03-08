import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelModule } from './modules/channel/channel.module';
import { ChatModule } from './modules/chat/chat.module';
import { ClientsModule, Transport } from '@nestjs/microservices';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mongodb",
      host: "localhost",
      port: 27017,
      database: "chat",
      autoLoadEntities: true,
      synchronize: true
    }),
    // ClientsModule.register([
    //   {
    //     name: ' CHAT_SERVICE',
    //     transport: Transport.REDIS,
    //     options: {
    //       url: 'redis://localhost:6379',
    //     }
    //   },
    // ]),
    ChannelModule,
    ChatModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
