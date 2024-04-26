import React, {
  ChangeEvent,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from './OtherComment.module.css';
import { OtherCommentProps } from '../_types/otherCommentProps';
import UserIcon from './UserIcon';

const OtherComment = forwardRef<HTMLDivElement, OtherCommentProps>(
  (
    {
      writer,
      writerProfile,
      content,
      date,
      deleteComment,
      commentId,
      updateComment,
    },
    ref,
  ) => {
    const commentRef = useRef<HTMLTextAreaElement>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(content);

    const handleEdit = () => {
      setIsEditing(true);
    };

    const handleEditSave = () => {
      // 수정 후 저장!
      updateComment(editedContent, commentId);
      setIsEditing(false);
    };

    const commentInputChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setEditedContent(e.target.value);
    };

    useEffect(() => {
      if (!isEditing) {
        setEditedContent(content);
      }
    }, [isEditing, content]);

    return (
      <div className={styles.otherCommentDiv} ref={ref}>
        <UserIcon nickname={writer} profileImageUrl={writerProfile} />
        <div>
          <div className={styles.userInfoDiv}>
            <p id={styles.useName}>{writer}</p>
            <p id={styles.date}>{date}</p>
          </div>
          {isEditing ? (
            <div className={styles.commentBox}>
              <textarea
                placeholder={content}
                value={editedContent}
                className={styles.otherCommentTextarea}
                onChange={commentInputChangeHandler}
                ref={commentRef}
              />
              {editedContent && (
                <button
                  type="button"
                  className={styles.inputButton}
                  onClick={handleEditSave}
                >
                  입력
                </button>
              )}
            </div>
          ) : (
            <div className={styles.contentDiv}>{content}</div>
          )}
          <div className={styles.commentOptionsDiv}>
            {isEditing ? (
              <button
                className={styles.option}
                type="button"
                onClick={() => setIsEditing(false)}
              >
                취소
              </button>
            ) : (
              <button
                className={styles.option}
                type="button"
                onClick={handleEdit}
              >
                수정
              </button>
            )}
            <button
              className={styles.option}
              type="button"
              onClick={() => deleteComment(commentId)}
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    );
  },
);

OtherComment.displayName = 'OtherComment';

export default OtherComment;
