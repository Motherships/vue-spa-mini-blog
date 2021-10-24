import Comment from '@/models/CommentModel';

export interface newArticle {
  title: string;
  content: string;
}
export default interface Article {
  id: string;
  title: string;
  content: string;
}
