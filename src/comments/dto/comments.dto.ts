import { IsInt, Length, IsOptional } from 'class-validator';

export class createCommentDTO {
  @Length(1, 100)
  content: string;

  @IsInt()
  userId: number;

  @IsOptional()
  @IsInt()
  parentCommentId?: number;

  @IsInt()
  postId: number;
}
