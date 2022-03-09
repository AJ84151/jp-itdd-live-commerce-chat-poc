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

}
