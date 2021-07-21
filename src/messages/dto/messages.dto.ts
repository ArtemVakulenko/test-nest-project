import { IUser } from 'src/users/interface/users.interface';
import { IsInt, Length } from 'class-validator';

export class IMessage {
  author: IUser;
  recipient: IUser;
  content: string;
}

export class createMessageDTO {
  @IsInt()
  authorId: number;
  @IsInt()
  recipientId: number;
  @Length(5, 25)
  content: string;
}
