import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatGateway } from './chat.gateway';
import { ChannelMessage } from '../channel/entity/channelMessage.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChannelMessage])
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
