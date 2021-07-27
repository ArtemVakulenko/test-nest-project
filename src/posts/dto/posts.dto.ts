import { IsInt, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IUser } from '../../users/dto/users.dto';

export class createPostDTO {
  @ApiProperty({ type: Number })
  @IsInt()
  userId: number;

  @ApiProperty({ type: String })
  @Length(1, 100)
  content: string;
}

export class IPost {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  content: string;

  @ApiProperty()
  user: IUser;

  @ApiProperty({ type: Number })
  likes: number;
}
