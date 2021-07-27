import { IUser } from '../../users/interface/users.interface';
import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IFriendRequest {
  @ApiProperty()
  author: IUser;

  @ApiProperty()
  recipient: IUser;

  @ApiProperty({ type: String })
  status: string;
}

export class createFriendRequestDTO {
  @ApiProperty({ type: Number })
  @IsInt()
  authorId: number;

  @ApiProperty({ type: Number })
  @IsInt()
  recipientId: number;
}

export class acceptFriendRequestDTO {
  @ApiProperty({ type: Number })
  @IsInt()
  authorId: number;

  @ApiProperty({ type: Number })
  @IsInt()
  recipientId: number;
}
