import { IsInt, Length } from 'class-validator';
// import { User } from 'src/database/entities/User.entity';

export class createPostDTO {
  @IsInt()
  userId: number;

  @Length(1, 100)
  content: string;
}
