import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from '../database/entities/Post.entity';
import { User } from 'src/database/entities/User.entity';
import { createPostDTO } from './dto/posts.dto';
import { IPost } from './interface/posts.interface';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<IPost[]> {
    const posts = await this.postsRepository.find();
    console.log(posts);
    return posts;
  }

  findAllByUserId(id: number): Promise<IPost[]> {
    return this.postsRepository.find({
      relations: ['user'],
      where: { user: { id } },
    });
  }

  async createPost(body: createPostDTO): Promise<void> {
    const { content, user } = body;
    const post = await this.postsRepository.create(body);
    const author = await this.usersRepository.findOne({ id: user.id });
    post.user = author;
    console.log(post);
    await this.postsRepository.save(post);
  }
}
