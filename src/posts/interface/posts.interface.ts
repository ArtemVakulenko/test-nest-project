import { IUser } from 'src/users/interface/users.interface';

export class IPost {
  id: number;
  content: string;
  user: IUser;
  likes: number;
}
