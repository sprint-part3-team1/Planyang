import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { TaskCardModalPropsType } from '@/app/_types/modalProps';
import { useOutsideClick } from '@/app/_hooks/useOutsideClick';
import useAppDispatch from '@/app/_hooks/useAppDispatch';
import useAppSelector from '@/app/_hooks/useAppSelector';
import { cardActions } from '@/app/_slice/cardSlice';
import { commentActions, commentData } from '@/app/_slice/commentSlice';
import { columnActions, columnData } from '@/app/_slice/columnSlice';
import { useParams } from 'next/navigation';
import MODAL_TYPES from '@/app/constants/modalTypes';
import {
  cardDetailActions,
  cardDetailData,
} from '@/app/_slice/cardDetailSlice';
import { setChangeCard } from '@/app/_slice/changedCardSlice';
import { useDispatch } from 'react-redux';
import ManagerInfoBox from './ManagerInfoBox';
import ModalContainer from '../modalContainer/ModalContainer';
import StatusTag from '../../DropDown/StatusTag';
import styles from './TaskCardModal.module.css';
import Divider from '../../../../../public/assets/icons/divider.svg';
import CloseIcon from '../../../../../public/assets/icons/close';
import MoreIcon from '../../../../../public/assets/icons/more';
import PopupDropDown from '../../DropDown/PopupDropDown';
import OtherComment from '../../OtherComment';
import TagIcon from '../../TagIcon';

const TaskCardModal = ({
  setOpenModalType,
  requestId,
}: TaskCardModalPropsType) => {
  const dispatch = useAppDispatch();
  const cardInfo = useAppSelector(cardDetailData);
  const commentDataList = useAppSelector(commentData);
  const columnDataList = useAppSelector(columnData);
  const params = useParams();
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const cardDispatch = useDispatch();

  const [myCommentInputValue, setMyCommentInputValue] = useState('');
  const [isPressedMoreIcon, setIsPressedMoreIcon] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isClickedClose, setIsClickedClose] = useState(false);
  const [isClickEditMode, setIsClickEditMode] = useState(false);

  let status = '';

  const changeCards = () => {
    cardDispatch(setChangeCard(true));
  };

  const unchangeCards = () => {
    cardDispatch(setChangeCard(false));
  };

  useEffect(() => {
    if (isClickedClose) {
      setOpenModalType('');
    } else if (isClickEditMode) {
      setOpenModalType('');
      setOpenModalType(MODAL_TYPES.modifyTask);
    }
  }, [isClickedClose, isClickEditMode]);

  useEffect(() => {}, [myCommentInputValue]);

  useEffect(() => {
    const fetchCardDetail = async () => {
      try {
        await dispatch(
          cardDetailActions.asyncFetchGetCard({
            cardId: Number(requestId),
          }),
        );
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching card detail:', error);
        setIsLoading(true);
      }
    };
    const fetchColumns = async () => {
      try {
        await dispatch(
          columnActions.asyncFetchGetColumn({ dashboardId: Number(params.id) }),
        );
      } catch (error) {
        console.error('Error fetching columns:', error);
      }
    };

    fetchCardDetail();
    fetchColumns();
  }, [requestId, dispatch]);

  const fetchComment = async () => {
    try {
      await dispatch(
        commentActions.asyncFetchGetComment({
          cardId: Number(requestId),
        }),
      );
    } catch (error) {
      console.error('Error fetching comment:', error);
    }
  };

  useEffect(() => {
    fetchComment();
  }, [dispatch]);
  const postComment = async () => {
    if(cardInfo) {
      try {
        await dispatch(
          commentActions.asyncFetchLeaveComment({
            content: myCommentInputValue,
            cardId: Number(requestId),
            columnId: cardInfo.columnId,
            dashboardId: cardInfo.dashboardId,
          }),
        );
        await fetchComment();
        if(commentRef.current) {
          commentRef.current.value = '';
        }
      } catch (error) {
        console.error('Error post comment:', error);
      }
    }
  };

  const deleteComment = async (commentId: number) => {
    try {
      await dispatch(
        commentActions.asynchFetchDeleteComment({
          commentId,
        }),
      );
      await fetchComment();
    } catch (error) {
      console.error('Error delete comment:', error);
    }
  };

  const x = columnDataList?.data?.filter(
    (item) => item.id === cardInfo?.columnId,
  );
  if (x && x?.length > 0) {
    status = x[0].title;
  } else {
    console.log('No item found matching the condition.');
  }

  const updateComment = async (content: string, commentId: number) => {
    try {
      await dispatch(
        commentActions.asyncFetchUpdateComment({
          content,
          commentId,
        }),
      );
      await fetchComment();
    } catch (error) {
      console.error('Error update comment:', error);
    }
  };

  const deleteCard = async (cardId: number) => {
    try {
      changeCards();
      await dispatch(cardActions.asyncFetchDeleteCard({ cardId }));
    } catch (error) {
      console.error('Error delete card:', error);
    } finally {
      unchangeCards();
    }
  };

  const handleCloseClick = () => {
    if (isClickEditMode) {
      setIsClickedClose(false);
    } else {
      setIsClickedClose(true);
    }
  };

  const commentInputChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMyCommentInputValue(e.target.value);
  };

  const moreIconClickHandler = () => {
    setIsPressedMoreIcon(!isPressedMoreIcon);
  };

  const deleteOptionClickHandler = () => {
    handleCloseClick();
    deleteCard(cardInfo?.id);
  };

  const editOptionclickHandler = () => {
    setIsClickEditMode(true);
  };

  const viewPortResizeHandler = () => {
    const viewportWidth = window.innerWidth;
    if (viewportWidth < 767) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => viewPortResizeHandler(), []);

  useEffect(() => {
    window.addEventListener('resize', viewPortResizeHandler);

    return () => {
      window.removeEventListener('resize', viewPortResizeHandler);
    };
  }, []);

  const options = [
    {
      name: '삭제하기',
      onOptionSelect: deleteOptionClickHandler,
    },
    {
      name: '수정하기',
      onOptionSelect: editOptionclickHandler,
    },
  ];

  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, handleCloseClick);

  const commentKeyboardHandler = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (e.key === 'Enter') {
      postComment();
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ModalContainer title={cardInfo?.title} ref={ref}>
      {isMobile && (
        <ManagerInfoBox
          managerName={cardInfo?.assignee ? cardInfo.assignee.nickname : ''}
          managerProfileImageUrl={
            cardInfo?.assignee ? cardInfo.assignee.profileImageUrl : ''
          }
          deadline={cardInfo?.dueDate}
        />
      )}
      <div className={styles.rowDiv}>
        <div className={styles.rowDivOne}>
          <div className={styles.allTagsDiv}>
            <StatusTag status={status} />
            <Divider />
            <div className={styles.tagDiv}>
              {cardInfo?.tags.map((tag) => (
                <TagIcon
                  key={tag}
                  tagName={tag}
                  tagStyleType="smallTag"
                  deleteOption={false}
                  onValueChange={() => {}}
                />
              ))}
            </div>
          </div>
          <div className={styles.contentDiv}>{cardInfo?.description}</div>
          {cardInfo?.imageUrl && (
            <div className={styles.ImageDiv}>
              <img width="100%" src={cardInfo?.imageUrl} alt="card-img" />
            </div>
          )}
          <div className={styles.writeCommentDiv}>
            <p id={styles.title}>댓글</p>
            <div className={styles.myCommentDiv}>
              <textarea
                placeholder="댓글 작성하기"
                className={styles.myCommentTextarea}
                onChange={commentInputChangeHandler}
                ref={commentRef}
                onKeyDown={commentKeyboardHandler}
              />
              {myCommentInputValue && (
                <button
                  type="button"
                  className={styles.inputButton}
                  onClick={postComment}
                >
                  입력
                </button>
              )}
            </div>
          </div>
          {commentDataList?.comments?.map((comment) => (
            <React.Fragment key={comment.id}>
              <OtherComment
                writer={comment.author.nickname}
                writerProfile={comment.author.profileImageUrl}
                content={comment.content}
                date={comment.createdAt}
                deleteComment={deleteComment}
                commentId={comment.id}
                updateComment={updateComment}
              />
            </React.Fragment>
          ))}
        </div>
        {isMobile || (
          <ManagerInfoBox
            managerName={cardInfo?.assignee ? cardInfo.assignee.nickname : ''}
            managerProfileImageUrl={
              cardInfo?.assignee ? cardInfo.assignee.profileImageUrl : ''
            }
            deadline={cardInfo?.dueDate}
          />
        )}
      </div>
      <div className={styles.closeIconDiv}>
        <MoreIcon
          width={isMobile ? 20 : 28}
          height={isMobile ? 20 : 24}
          handleClick={moreIconClickHandler}
        />
        <CloseIcon
          width={isMobile ? 24 : 32}
          height={isMobile ? 24 : 32}
          handleCloseClick={handleCloseClick}
        />
      </div>
      {isPressedMoreIcon && (
        <PopupDropDown
          options={options}
          setIsPressedMoreIcon={setIsPressedMoreIcon}
        />
      )}
    </ModalContainer>
  );
};

export default TaskCardModal;
