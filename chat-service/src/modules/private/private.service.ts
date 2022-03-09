import { Injectable } from '@nestjs/common';
import { Repository, Like, getRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PrivateMessage } from './entity/privateMessage.entity';

@Injectable()
export class PrivateService {
  constructor(
    @InjectRepository(PrivateMessage)
    private readonly channelMessageRepository: Repository<PrivateMessage>,
  ) {}

}
