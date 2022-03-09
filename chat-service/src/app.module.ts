import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelModule } from './modules/channel/channel.module';
import { ChatModule } from './modules/chat/chat.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mongodb",
      host: "localhost",
      port: 27017,
      database: "chat",
      autoLoadEntities: true,
      synchronize: true,
      useUnifiedTopology: true
    }),
    ChannelModule,
    ChatModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
