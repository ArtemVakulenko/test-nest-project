import { IUser } from 'src/users/interface/users.interface';

export class IComment {
  id: number;
  content: string;
  parentComment: IComment | null;
  user: IUser;
}
