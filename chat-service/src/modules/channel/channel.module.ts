import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelService } from './channel.service';
import { ChannelController } from './channel.controller';
import { ChannelMessage } from './entity/channelMessage.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChannelMessage]),
  ],
  providers: [ChannelService],
  controllers: [ChannelController],
})
export class ChannelModule {}
