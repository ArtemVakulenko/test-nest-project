import {
  Entity,
  Column,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';
import { UserEntity } from './User.entity';

@Entity()
export class FriendRequestEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => UserEntity)
  @JoinTable()
  authorId: UserEntity[];

  @ManyToMany(() => UserEntity)
  @JoinTable()
  recipientId: UserEntity[];

  @Column()
  status: boolean;
}
