import React, { forwardRef } from 'react';
import styles from './OtherComment.module.css';
import { OtherCommentProps } from '../_types/otherCommentProps';
import UserIcon from './UserIcon';

const OtherComment = forwardRef<HTMLDivElement, OtherCommentProps>(
  ({ writer, content, date }, ref) => {
    return (
      <div className={styles.otherCommentDiv} ref={ref}>
        <UserIcon nickname={writer} profileImageUrl={null} />
        <div>
          <div className={styles.userInfoDiv}>
            <p id={styles.useName}>{writer}</p>
            <p id={styles.date}>{date}</p>
          </div>
          <div className={styles.contentDiv}>{content}</div>
          <div className={styles.commentOptionsDiv}>
            <button className={styles.option} type="button">
              수정
            </button>
            <button className={styles.option} type="button">
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
