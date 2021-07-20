import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from './User.entity';

@Entity()
export class FriendRequestEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (UserEntity) => UserEntity.sentReqs)
  @JoinTable()
  author: UserEntity;

  @ManyToOne(() => UserEntity, (UserEntity) => UserEntity.recievedReqs)
  @JoinTable()
  recipient: UserEntity;

  @Column()
  status: string;
}
