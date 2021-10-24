export interface NewComment {
  parentId: string;
  authorName: string;
  content: string;
}
export default interface CommentModel {
  id: string;
  parentId: string;
  authorName: string;
  content: string;
}
