export default interface Comment {
	id: number;
	parentID?: number;
	content: string;
}