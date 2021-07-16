import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PostEntity } from './Post.entity';
import { CommentEntity } from './Comment.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  userName: string;
  @Column()
  password: string;
  @Column()
  email: string;

  @OneToMany(() => PostEntity, (post) => post.user)
  posts: PostEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comments: CommentEntity[];
}
