import Comment from '@/models/CommentModel';

export default interface Article {
  id: string;
  title: string;
  content: string;
  comments: Array<Comment>;
}
