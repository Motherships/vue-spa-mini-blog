import Comment from '@/models/CommentModel';

export interface NewArticle {
  title: string;
  content: string;
}

export interface CurrentArticle {
  id: string;
  title: string;
  content: string;
  comments: Array<Comment>;
}

export default interface Article {
  id: string;
  title: string;
  content: string;
}
