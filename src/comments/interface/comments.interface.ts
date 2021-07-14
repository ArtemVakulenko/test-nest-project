import { IPost } from 'src/posts/interface/posts.interface';
import { IUser } from 'src/users/interface/users.interface';

export class IComment {
  id: number;
  content: string;
  parentComment?: IComment;
  user: IUser;
  post: IPost;
}
