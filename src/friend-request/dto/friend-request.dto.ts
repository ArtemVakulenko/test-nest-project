import { IUser } from 'src/users/interface/users.interface';

export class IFriendRequest {
  authorId: IUser[];
  recipientId: IUser[];
  status: boolean;
}

export class createFriendRequestDTO {
  authorId: number;
  recipientId: number;
}
