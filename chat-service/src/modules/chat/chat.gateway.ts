import { Ctx, RedisContext } from "@nestjs/microservices";
import { InjectRepository } from "@nestjs/typeorm";
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
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
    this.server.emit('new-disconnection', { disconnectionId: client.id});
    console.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
    const {userId, userName, channelId} = client.handshake.query;
    client.join(channelId);
    client.to(channelId).emit('new-connection', { userId, userName, channelId , connectionId: client.id });
    this.server.to(client.id).emit('new-connection', { userId, userName, channelId, connectionId: client.id });
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
    // const data = {
    //   senderUserId: privateMessageDto.senderUserId,
    //   senderUserName: privateMessageDto.senderUserName,
    //   senderConnectionId: client.id,
    //   receiverUserId: privateMessageDto.receiverUserId,
    //   receiverUserName: privateMessageDto.receiverUserName,
    //   receiverConnectionId: privateMessageDto.receiverConnectionId,
    //   channelId: privateMessageDto.channelId,
    //   message: privateMessageDto.message,
    //   chatTime: chatTime,
    //   expirationTime: chatTime + chatTime + (100 * 24 * 60 * 60 * 1000)
    // }
    this.server.to(privateMessageDto.receiverConnectionId).emit('new-private-message', privateMessageDto);
    this.server.to(client.id).emit('new-private-message', privateMessageDto);
  }
}