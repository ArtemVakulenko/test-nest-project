import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PostEntity } from '../database/entities/Post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IComment } from './interface/comments.interface';
import { User } from 'src/database/entities/User.entity';
import { CommentEntity } from 'src/database/entities/Comment.entity';
import { createCommentDTO } from './dto/comments.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(CommentEntity)
    private commentsRepository: Repository<CommentEntity>,
  ) {}

  findAll(): Promise<IComment[]> {
    return this.commentsRepository.find({
      relations: ['user', 'post', 'parent_comment'],
    });
  }
  async findAllByPostId(id: number): Promise<IComment[]> {
    const posts = await this.commentsRepository.find({
      relations: ['user', 'post', 'parent_comment'],
      where: { post: { id } },
    });
    return posts;
  }

  async findAllByUserId(id: number): Promise<IComment[]> {
    const posts = await this.commentsRepository.find({
      relations: ['user', 'post', 'parent_comment'],
      where: { user: { id } },
    });
    return posts;
  }

  async createComment(body: createCommentDTO): Promise<void> {
    let parentComment;
    const { userId, parentCommentId, postId } = body;
    const comment = await this.commentsRepository.create(body);
    const commentPost = await this.postsRepository.findOne({ id: postId });
    const author = await this.usersRepository.findOne({ id: userId });
    if (parentCommentId) {
      parentComment = await this.commentsRepository.findOne({
        id: parentCommentId,
      });
    }
    comment.post = commentPost;
    comment.user = author;
    comment.parent_comment = parentComment;
    await this.commentsRepository.save(comment);
  }
}
