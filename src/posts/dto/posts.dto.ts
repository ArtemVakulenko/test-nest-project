import { IsInt, Length } from 'class-validator';

export class createPostDTO {
  @IsInt()
  userId: number;

  @Length(1, 100)
  content: string;
}
