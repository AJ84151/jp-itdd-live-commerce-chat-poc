import { InjectRepository } from "@nestjs/typeorm";
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from "@nestjs/websockets";
import { Socket } from "socket.io";
import { Repository } from "typeorm";
import { ChannelMessage } from "../channel/entity/channelMessage.entity";

//@WebSocketGateway(3001,{ cors: true, path: '/chat'})
@WebSocketGateway({ path: '/chat' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    @InjectRepository(ChannelMessage)
    private readonly channelMessageRepository: Repository<ChannelMessage>,
  ) {}

  @WebSocketServer()
  server;

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
    const q = client.handshake.query;
    console.dir(q);
  }

  @SubscribeMessage('send-channel-message')
  async handleChannelMessage(@MessageBody() channelMessageDto: ChannelMessageDto, @ConnectedSocket() client: Socket): Promise<void> {
    console.log(client.id); 
    const chatTime = new Date().valueOf();
    const data = {
      senderUserId: channelMessageDto.userId,
      senderUserName: channelMessageDto.userName,
      senderConnectionId: client.id,
      channelId: channelMessageDto.channelId,
      message: channelMessageDto.message,
      chatTime: chatTime,
      expirationTime: chatTime + (100 * 24 * 60 * 60 * 1000)
    }
    await this.channelMessageRepository.save(data);
    this.server.emit('new-channel-message', data);
  }

  @SubscribeMessage('send-private-message')
  async handlePrivateMessage(@MessageBody() channelMessageDto: ChannelMessageDto, @ConnectedSocket() client: Socket): Promise<void> {
    console.log(client.id);
    const chatTime = new Date().valueOf();
    const data = {
      senderUserId: channelMessageDto.userId,
      senderUserName: channelMessageDto.userName,
      senderConnectionId: client.id,
      channelId: channelMessageDto.channelId,
      message: channelMessageDto.message,
      chatTime: chatTime,
      expirationTime: chatTime + chatTime + (100 * 24 * 60 * 60 * 1000)
    }
    await this.channelMessageRepository.save(data);
    this.server.emit('new-channel-message', channelMessageDto);
  }
}