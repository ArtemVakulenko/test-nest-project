import { IsInt, Length } from 'class-validator';

export class createCommentDTO {
  @Length(1, 100)
  content: string;

  @IsInt()
  userId: number;

  @IsInt()
  parentComment: number | null;

  @IsInt()
  postId: number;
}
