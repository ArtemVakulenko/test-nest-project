import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { UserEntity } from './User.entity';
import { CommentEntity } from './Comment.entity';

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  likes: number;

  @ManyToOne(() => UserEntity, (user) => user.posts)
  @JoinColumn()
  user: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  @JoinColumn()
  comments: CommentEntity[];
}
