interface ChannelMessageDto {
  _id?: string;
  userName: string;
  userId?: string;
  channelId: string;
  message: string;
}

interface PrivateMessageDto {
  userId: string;
  friendId: string;
  content: string;
  width?: number;
  height?: number;
  messageType: string;
  time: number;
}