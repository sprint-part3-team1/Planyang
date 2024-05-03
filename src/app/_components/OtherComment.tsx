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
      if (editedContent.trim() !== '') {
        updateComment(editedContent, commentId);
        setIsEditing(false);
      } else {
        alert('내용을 입력해주세요.');
      }
    };

    const commentInputChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setEditedContent(e.target.value);
    };

    const commentKeyboardHandler = (
      e: React.KeyboardEvent<HTMLTextAreaElement>,
    ) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (editedContent.trim() !== '') {
          updateComment(editedContent, commentId);
          setIsEditing(false);
        }
      }
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
                onKeyDown={commentKeyboardHandler}
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
            <div className={styles.contentDiv}>
              {content.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </div>
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
