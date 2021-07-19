import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { PostEntity } from './Post.entity';
import { CommentEntity } from './Comment.entity';
// import { FriendRequestEntity } from './FriendRequest.entity';

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

  // @ManyToMany(
  //   () => FriendRequestEntity,
  //   (FriendRequestEntity) => FriendRequestEntity.authorId,
  // )
  // friendRequests: FriendRequestEntity[];
}
