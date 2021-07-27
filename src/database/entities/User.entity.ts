import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PostEntity } from './Post.entity';
import { CommentEntity } from './Comment.entity';
import { FriendRequestEntity } from './FriendRequest.entity';
import { MessageEntity } from './Message.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  userName: string;

  @Column({ nullable: true })
  password: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  provider: string;

  @OneToMany(() => PostEntity, (post) => post.user)
  posts: PostEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comments: CommentEntity[];

  @OneToMany(
    () => FriendRequestEntity,
    (FriendRequestEntity) => FriendRequestEntity.author,
  )
  sentReqs: FriendRequestEntity[];

  @OneToMany(
    () => FriendRequestEntity,
    (FriendRequestEntity) => FriendRequestEntity.recipient,
  )
  recievedReqs: FriendRequestEntity[];

  @OneToMany(() => MessageEntity, (MessageEntity) => MessageEntity.author)
  sentMessages: MessageEntity[];

  @OneToMany(() => MessageEntity, (MessageEntity) => MessageEntity.recipient)
  recievedMessages: MessageEntity[];
}
