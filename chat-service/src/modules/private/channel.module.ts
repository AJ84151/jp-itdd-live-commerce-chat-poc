import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrivateService } from './private.service';
import { PrivateController } from './private.controller';
import { PrivateMessage } from './entity/privateMessage.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PrivateMessage]),
  ],
  providers: [PrivateService],
  controllers: [PrivateController],
})
export class ChannelModule {}
