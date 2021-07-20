import { IUser } from 'src/users/interface/users.interface';

export class IFriendRequest {
  author: IUser;
  recipient: IUser;
  status: string;
}

export class createFriendRequestDTO {
  authorId: number;
  recipientId: number;
}
