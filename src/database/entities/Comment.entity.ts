import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { User } from './User.entity';
import { PostEntity } from './Post.entity';

@Entity()
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn()
  user: User;

  @ManyToOne(() => PostEntity, (PostEntity) => PostEntity.comments)
  @JoinColumn()
  post: PostEntity;
  @OneToOne(
    () => CommentEntity,
    (CommentEntity) => CommentEntity.parent_comment,
  )
  @JoinColumn()
  parent_comment: CommentEntity;
}
