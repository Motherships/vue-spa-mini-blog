export interface NewComment {
  parentId: string;
  authorName: string;
  content: string;
}

export interface UpdatedComment {
  id: string;
  authorName: string;
  content: string;
}

export default interface Comment {
  id: string;
  parentId: string;
  authorName: string;
  content: string;
}
