import { IUser } from 'src/users/interface/users.interface';

export interface IPost {
  id: number;
  content: string;
  user: IUser;
  likes: number;
}
