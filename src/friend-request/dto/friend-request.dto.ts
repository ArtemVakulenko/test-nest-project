import { IUser } from 'src/users/interface/users.interface';
import { IsInt } from 'class-validator';

export class IFriendRequest {
  author: IUser;
  recipient: IUser;
  status: string;
}

export class createFriendRequestDTO {
  @IsInt()
  authorId: number;
  @IsInt()
  recipientId: number;
}

export class acceptFriendRequestDTO {
  @IsInt()
  authorId: number;
  @IsInt()
  recipientId: number;
}
