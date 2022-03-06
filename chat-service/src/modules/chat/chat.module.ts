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
    // const defaultGroup = await this.groupRepository.find({groupName: '阿童木聊天室'});
    // if(!defaultGroup.length) {
    //   await this.groupRepository.save({
    //     groupId: '',
    //     groupName: '',
    //     userId: 'admin',
    //     createTime: new Date().valueOf()
    //   });
    //   console.log('create default group 阿童木聊天室');
    // }
  }
}
