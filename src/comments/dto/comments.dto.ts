import { IsInt, Length, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IPost } from '../../posts/dto/posts.dto';
import { IUser } from '../../users/dto/users.dto';

export class createCommentDTO {
  @ApiProperty({ type: String })
  @Length(1, 100)
  content: string;

  @ApiProperty({ type: Number })
  @IsInt()
  userId: number;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsInt()
  parentCommentId?: number;

  @ApiProperty({ type: Number })
  @IsInt()
  postId: number;
}

export class IComment {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  content: string;

  @ApiPropertyOptional()
  parentComment?: IComment;

  @ApiProperty()
  user: IUser;

  @ApiProperty()
  post: IPost;

  @ApiProperty({ type: Number })
  likes: number;
}
