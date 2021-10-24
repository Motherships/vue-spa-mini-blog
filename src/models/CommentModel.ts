export default interface Comment {
  id: string;
  parentID?: string;
  authorName: string;
  content: string;
}
