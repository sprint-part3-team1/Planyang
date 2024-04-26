export type OtherCommentProps = {
  writer: string;
  content: string;
  date: string;
  deleteComment?: (commentId: number) => void;
  commentId?: number;
};
