import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatGateway } from './chat.gateway';
import { ChannelMessage } from '../channel/entity/channelMessage.entity';
import * as redisStore from 'cache-manager-redis-store';
import { RedisCacheModule } from '../redis/redis.module';
import { ChannelInfo } from '../channel/entity/channelInfo.entity';
import { PrivateMessage } from '../private/entity/privateMessage.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChannelInfo, ChannelMessage, PrivateMessage]),
    // CacheModule.register({
    //   store: redisStore,
    //   host: 'localhost',
    //   port: 6379,
    // }),
    RedisCacheModule,
  ],
  providers: [ChatGateway],
})
export class ChatModule {
  constructor(
    // @InjectRepository(Group)
    // private readonly groupRepository: Repository<Group>,
  ) {}
  async onModuleInit() {

  }
}
