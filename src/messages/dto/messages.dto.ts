import { IUser } from 'src/users/interface/users.interface';

export class IMessage {
  author: IUser;
  recipient: IUser;
  content: string;
}

export class createMessageDTO {
  authorId: number;
  recipientId: number;
  content: string;
}
