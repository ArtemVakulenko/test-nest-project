import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { UserEntity } from './User.entity';

@Entity()
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (UserEntity) => UserEntity.sentMessages)
  @JoinTable()
  author: UserEntity;

  @ManyToOne(() => UserEntity, (UserEntity) => UserEntity.recievedMessages)
  @JoinTable()
  recipient: UserEntity;

  @Column()
  content: string;
}
