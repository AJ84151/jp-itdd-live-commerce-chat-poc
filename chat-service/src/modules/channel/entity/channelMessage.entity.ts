import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class ChannelMessage {
  @ObjectIdColumn()
  _id: number;

  @Column()
  senderUserId: string;

  @Column()
  senderUserName: string;

  @Column()
  senderConnectionId: string;

  @Column()
  channelId: string;

  @Column()
  message: string;

  @Column('double')
  chatTime: number;

  @Column('double')
  expirationTime: number;
}
