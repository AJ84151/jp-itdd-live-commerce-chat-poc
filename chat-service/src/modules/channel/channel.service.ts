import { Injectable } from '@nestjs/common';
import { Repository, Like, getRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelMessage } from './entity/channelMessage.entity';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(ChannelMessage)
    private readonly channelMessageRepository: Repository<ChannelMessage>,
  ) {}

  // async postChannels(ChannelIds: string) {
  //   try {
  //     if(ChannelIds) {
  //       const ChannelIdArr = ChannelIds.split(',');
  //       const ChannelArr = [];
  //       for(const ChannelId of ChannelIdArr) {
  //         const data = await this.channelMessageRepository.findOne({ChannelId: ChannelId});
  //         ChannelArr.push(data);
  //       }
  //       return { msg:'获取群信息成功', data: ChannelArr};
  //     }
  //     return {code: RCode.FAIL, msg:'获取群信息失败', data: null};
  //   } catch (e) {
  //     return {code: RCode.ERROR, msg:'获取群失败',data: e};
  //   }
  // }

  // async getUserChannels(userId: string) {
  //   try {
  //     let data;
  //     if(userId) {
  //       data = await this.ChannelUserRepository.find({userId: userId});
  //       return { msg:'获取用户所有群成功', data};
  //     }
  //     data = await this.ChannelUserRepository.find();
  //     return { msg:'获取系统所有群成功', data};
  //   } catch (e) {
  //     return {code: RCode.ERROR, msg:'获取用户的群失败',data: e};
  //   }
  // }

  // async getChannelUsers(ChannelId: string) {
  //   try {
  //     let data;
  //     if(ChannelId) {
  //       data = await this.ChannelUserRepository.find({ChannelId: ChannelId});
  //       return { msg:'获取群的所有用户成功', data};
  //     }
  //   } catch (e) {
  //     return {code: RCode.ERROR, msg:'获取群的用户失败',data: e};
  //   }
  // }

  // async getChannelMessages(ChannelId: string, current: number, pageSize: number) {
  //   let ChannelMessage = await getRepository(ChannelMessage)
  //   .createQueryBuilder("ChannelMessage")
  //   .orderBy("ChannelMessage.time", "DESC")
  //   .where("ChannelMessage.ChannelId = :id", { id: ChannelId })
  //   .skip(current)
  //   .take(pageSize)
  //   .getMany();
  //   ChannelMessage = ChannelMessage.reverse();

  //   const userGather: {[key: string]: User} = {};
  //   let userArr: FriendDto[] = [];
  //   for(const message of ChannelMessage) {
  //     if(!userGather[message.userId]) {
  //       userGather[message.userId] = await getRepository(User)
  //       .createQueryBuilder("user")
  //       .where("user.userId = :id", { id: message.userId })
  //       .getOne();
  //     }
  //   }
  //   userArr = Object.values(userGather);
  //   return {msg: '', data: { messageArr: ChannelMessage, userArr: userArr }};
  // }

  // async getChannelsByName(ChannelName: string) {
  //   try {
  //     if(ChannelName) {
  //       const Channels = await this.ChannelRepository.find({ChannelName: Like(`%${ChannelName}%`)});
  //       return { data: Channels};
  //     }
  //     return {code: RCode.FAIL, msg:'请输入群昵称', data: null};
  //   } catch(e) {
  //     return {code: RCode.ERROR, msg:'查找群错误', data: null};
  //   }
  // }
}
