import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PostEntity } from '../database/entities/Post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IComment } from './interface/comments.interface';
import { User } from 'src/database/entities/User.entity';
import { CommentEntity } from 'src/database/entities/Comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(User)
    private commentsRepository: Repository<CommentEntity>,
  ) {}

  findAll(): Promise<CommentEntity[]> {
    return this.commentsRepository.find();
  }
  async findAllByPostId(id: number): Promise<CommentEntity[]> {
    const posts = await this.commentsRepository.find({
      relations: ['user', 'post'],
      where: { post: { id } },
    });
    return posts;
  }
}
