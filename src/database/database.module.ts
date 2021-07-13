import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { PostEntity } from './entities/Post.entity';
// import { User } from './entities/User.entity';

@Module({
  imports: [TypeOrmModule.forRoot()],
  // exports: [TypeOrmModule.forFeature([PostEntity, User])],
})
export class DatabaseModule {}
