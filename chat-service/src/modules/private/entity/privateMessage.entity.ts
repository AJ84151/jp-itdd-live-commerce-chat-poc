import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class PrivateMessage {
  @ObjectIdColumn()
  _id: string;

  @Column()
  senderUserId: string;

  @Column()
  senderUserName: string;

  @Column()
  senderConnectionId: string;

  @Column()
  receiverUserId: string;

  @Column()
  receiverUserName: string;

  @Column()
  receiverConnectionId: string;

  @Column()
  channelId: string;

  @Column()
  message: string;

  @Column('double')
  chatTime: number;
}
