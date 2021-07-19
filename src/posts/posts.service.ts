import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from '../database/entities/Post.entity';
import { UserEntity } from 'src/database/entities/User.entity';
import { createPostDTO } from './dto/posts.dto';
import { IPost } from './interface/posts.interface';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<IPost[]> {
    const posts = await this.postsRepository.find({
      relations: ['user'],
    });
    return posts;
  }

  findAllByUserId(id: number): Promise<IPost[]> {
    return this.postsRepository.find({
      relations: ['user'],
      where: { user: { id } },
    });
  }
  async addLike(id) {
    await this.postsRepository.increment({ id }, 'likes', 1);
  }

  async createPost(body: createPostDTO): Promise<void> {
    const post = await this.postsRepository.create(body);
    const author = await this.usersRepository.findOne({ id: body.userId });
    post.user = author;
    post.likes = 0;
    await this.postsRepository.save(post);
  }
}
