import { Entity, Column, ObjectIdColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ChannelInfo {
  @ObjectIdColumn()
  _id: string;

  @Column()
  userId: string | string[];

  @Column()
  userName: string | string[];

  @Column()
  channelId: string | string[];
}
