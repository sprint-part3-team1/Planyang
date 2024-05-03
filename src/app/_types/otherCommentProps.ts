export type OtherCommentProps = {
  writer: string;
  writerProfile: string | null;
  content: string;
  date: string;
  deleteComment: (commentId: number) => void;
  commentId: number;
  updateComment: (content: string, commentId: number) => void;
};
