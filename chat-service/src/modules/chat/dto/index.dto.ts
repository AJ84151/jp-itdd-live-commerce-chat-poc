interface ChannelMessageDto {
  _id?: string;
  userName: string;
  userId?: string;
  channelId: string;
  message: string;
}

interface LoadChannelMessageHistoryDto {
  channelId: string;
}

interface PrivateMessageDto {
  _id?: string;
  senderUserName: string;
  senderUserId: string;
  channelId: string;
  receiverUserName: string;
  receiverUserId?: string;
  receiverConnectionId?: string;
  message: string;
}