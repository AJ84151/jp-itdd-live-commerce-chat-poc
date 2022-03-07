import { Ctx, RedisContext } from "@nestjs/microservices";
import { InjectRepository } from "@nestjs/typeorm";
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from "@nestjs/websockets";
import { Socket } from "socket.io";
import { Repository } from "typeorm";
import { ChannelMessage } from "../channel/entity/channelMessage.entity";

//@WebSocketGateway(3001,{ cors: true, path: '/chat'})
@WebSocketGateway(3001, { path: '/chat' })
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
    const query = client.handshake.query;
    console.dir(query);
    client.join(query.channelId);
  }

  @SubscribeMessage('send-channel-message')
  async handleChannelMessage(@MessageBody() channelMessageDto: ChannelMessageDto, @ConnectedSocket() client: Socket): Promise<void> {
    console.log(client.id); 
    //client.join(channelMessageDto.channelId);
    //console.log(`Channel: ${context.getChannel()}`);
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
    //this.server.emit('new-channel-message', data);
    client.to(channelMessageDto.channelId).emit('new-channel-message', data);
  }

  @SubscribeMessage('send-private-message')
  async handlePrivateMessage(@MessageBody() privateMessageDto: PrivateMessageDto, @ConnectedSocket() client: Socket): Promise<void> {
    console.log(client.id);
    const chatTime = new Date().valueOf();
    const data = {
      senderUserId: privateMessageDto.senderUserId,
      senderUserName: privateMessageDto.senderUserName,
      senderConnectionId: client.id,
      receiverUserId: privateMessageDto.receiverUserId,
      receiverUserName: privateMessageDto.receiverUserName,
      receiverConnectionId: privateMessageDto.receiverConnectionId,
      channelId: privateMessageDto.channelId,
      message: privateMessageDto.message,
      chatTime: chatTime,
      expirationTime: chatTime + chatTime + (100 * 24 * 60 * 60 * 1000)
    }
    // await this.channelMessageRepository.save(data);
    // this.server.emit('new-private-message', channelMessageDto);
    client.broadcast.to(privateMessageDto.receiverConnectionId).emit('new-private-message', privateMessageDto);
  }
}