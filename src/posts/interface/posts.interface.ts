import { IUser } from '../../users/interface/users.interface';
import { ApiProperty } from '@nestjs/swagger';

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
