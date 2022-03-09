import { InjectRepository } from "@nestjs/typeorm";
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { Socket } from "socket.io";
import { Repository } from "typeorm";
import { ChannelMessage } from "../channel/entity/channelMessage.entity";
import { RedisCacheService } from "../redis/redis.service";
import { ChannelInfo } from "../channel/entity/channelInfo.entity";
import { PrivateMessage } from "../private/entity/privateMessage.entity";

//@WebSocketGateway(3001,{ cors: true, path: '/chat'})
@WebSocketGateway(3001, { path: '/chat' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    @InjectRepository(ChannelMessage)
    private readonly channelMessageRepository: Repository<ChannelMessage>,
    @InjectRepository(ChannelInfo)
    private readonly channelInforRepository: Repository<ChannelInfo>,
    @InjectRepository(PrivateMessage)
    private readonly privateMessageRepository: Repository<PrivateMessage>,
    private redisCacheService: RedisCacheService,    
  ) {}

  @WebSocketServer()
  server;

  async handleDisconnect(client: Socket) {
    this.server.emit('new-disconnection', { disconnectionId: client.id});
    console.log(`Client disconnected: ${client.id}`);
    const { channelId } = await this.channelInforRepository.findOne({ _id: client.id });
    await this.channelInforRepository.delete({ _id: client.id });
    const respData = await this.channelInforRepository.find({ where: { channelId } })
    client.to(channelId).emit('new-connection', respData);
  }

  async handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
    const {userId, userName, channelId} = client.handshake.query;
    client.join(channelId);
    const data ={_id: client.id, userId, userName, channelId};
    await this.channelInforRepository.save(data);
    await this.redisCacheService.set(client.id, {userId});
    const respData =  await this.channelInforRepository.find({ where: { channelId } })
    client.to(channelId).emit('new-connection', respData);
    this.server.to(client.id).emit('new-connection', respData);
  }

  @SubscribeMessage('send-channel-message')
  async handleChannelMessage(@MessageBody() channelMessageDto: ChannelMessageDto, @ConnectedSocket() client: Socket): Promise<void> {
    console.log(client.id); 
    //client.join(channelMessageDto.channelId);
    //console.log(`Channel: ${context.getChannel()}`);
    const chatTime = new Date().valueOf();
    const data = {
      _id: `${client.id}-${chatTime}`,
      senderUserId: channelMessageDto.userId,
      senderUserName: channelMessageDto.userName,
      senderConnectionId: client.id,
      channelId: channelMessageDto.channelId,
      message: channelMessageDto.message,
      chatTime: chatTime,
    }
    const respData = await this.channelMessageRepository.save(data);
    //this.server.emit('new-channel-message', data);
    client.to(channelMessageDto.channelId).emit('new-channel-message', respData); 
    this.server.to(client.id).emit('new-private-message', respData);
  }
  @SubscribeMessage('load-channel-message-history')
  async loadChannelMessage(@MessageBody() loadChannelMessageHistoryDto: LoadChannelMessageHistoryDto, @ConnectedSocket() client: Socket): Promise<void> {
    console.log(client.id);
    const { channelId } = loadChannelMessageHistoryDto;
    const respData = await this.channelMessageRepository.find({ where: { channelId: channelId } });
    this.server.to(client.id).emit('channel-message-history', respData);
  }


  @SubscribeMessage('send-private-message')
  async handlePrivateMessage(@MessageBody() privateMessageDto: PrivateMessageDto, @ConnectedSocket() client: Socket): Promise<void> {
    console.log(client.id);
    const chatTime = new Date().valueOf();
    const data = {
      _id: `${client.id}-${chatTime}`,
      senderUserId: privateMessageDto.senderUserId,
      senderUserName: privateMessageDto.senderUserName,
      senderConnectionId: client.id,
      receiverUserId: privateMessageDto.receiverUserId,
      receiverUserName: privateMessageDto.receiverUserName,
      receiverConnectionId: privateMessageDto.receiverConnectionId,
      channelId: privateMessageDto.channelId,
      message: privateMessageDto.message,
      chatTime: chatTime,
    }
    const respData = await this.privateMessageRepository.save(data);
    this.server.to(privateMessageDto.receiverConnectionId).emit('new-private-message', respData);
    this.server.to(client.id).emit('new-private-message', respData);
  }

  @SubscribeMessage('load-private-message-history')
  async loadPrivateMessage(@MessageBody() loadPrivateMessageHistoryDto: LoadPrivateMessageHistoryDto, @ConnectedSocket() client: Socket): Promise<void> {
    console.log(client.id);
    const { senderUserId, receiverUserId, channelId } = loadPrivateMessageHistoryDto;
    const respData = await this.privateMessageRepository.find({ where: { channelId, senderUserId, receiverUserId } });
    this.server.to(client.id).emit('private-message-history', respData);
  }
}