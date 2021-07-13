import { IsInt, Length } from 'class-validator';
import { User } from 'src/database/entities/User.entity';

export class createPostDTO {
  user: User;

  @Length(1, 100)
  content: string;
}
