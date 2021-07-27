import { IPost } from '../../posts/interface/posts.interface';
import { IUser } from '../../users/interface/users.interface';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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
