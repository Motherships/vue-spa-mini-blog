import Comment from "@/models/CommentModel"

export default interface Article {
	id: number;
	title: string;
	content: string;
	comments: Array<Comment>;
}