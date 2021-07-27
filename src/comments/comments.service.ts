import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PostEntity } from '../database/entities/Post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IComment } from './dto/comments.dto';
import { UserEntity } from '../database/entities/User.entity';
import { CommentEntity } from '../database/entities/Comment.entity';
import { createCommentDTO } from './dto/comments.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
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

  async addLike(id: number): Promise<void> {
    await this.commentsRepository.increment({ id }, 'likes', 1);
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
    comment.likes = 0;
    await this.commentsRepository.save(comment);
  }
}
