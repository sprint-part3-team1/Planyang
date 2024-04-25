import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { TaskCardModalPropsType } from '@/app/_types/modalProps';
import { useOutsideClick } from '@/app/_hooks/useOutsideClick';
import Image from 'next/image';
import useAppDispatch from '@/app/_hooks/useAppDispatch';
import useAppSelector from '@/app/_hooks/useAppSelector';
import { cardActions, cardData } from '@/app/_slice/cardSlice';
import ManagerInfoBox from './ManagerInfoBox';
import ModalContainer from '../modalContainer/ModalContainer';
import StatusTag from '../../DropDown/StatusTag';
import styles from './TaskCardModal.module.css';
import Divider from '../../../../../public/assets/icons/divider.svg';
import cardImg from '../../../../../public/assets/images/exampleCardImg.png';
import CloseIcon from '../../../../../public/assets/icons/close';
import MoreIcon from '../../../../../public/assets/icons/more';
import PopupDropDown from '../../DropDown/PopupDropDown';
import OtherComment from '../../OtherComment';
import TagIcon from '../../TagIcon';

const TaskCardModal = ({
  setOpenModalType,
  requestId,
}: TaskCardModalPropsType) => {
  // const CARD_INFO = {
  //   title: '새로운 일정 관리 Taskify',
  //   content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum finibus nibh
  //     arcu, quis consequat ante cursus eget. Cras mattis, nulla non laoreet porttitor,
  //     diam justo laoreet eros, vel aliquet diam elit at leo.`,
  //   status: 'To Do',
  //   tags: [
  //     '프로젝트',
  //     '일반',
  //     '백엔드',
  //     '상',
  //     '프로젝트2',
  //     '일반2',
  //     '백엔드2',
  //     '상2',
  //   ],
  //   manager: '배유철',
  //   deadline: '2022.12.30 19:00',
  // };

  const COMMENT_INFO = [
    {
      id: 0,
      writer: '정만철',
      content: `오늘안에 오늘안에 오늘안에 오늘안에
      오늘안에 오늘안에 오늘안에`,
      date: '2022.13.14 13:00',
    },
  ];

  const dispatch = useAppDispatch();
  const cardInfo = useAppSelector(cardData);

  const [myCommentInputValue, setMyCommentInputValue] = useState('');
  const [isPressedMoreIcon, setIsPressedMoreIcon] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {}, [myCommentInputValue]);

  useEffect(() => {
    const fetchCardDetail = async () => {
      try {
        await dispatch(
          cardActions.asyncFetchGetCard({
            cardId: Number(requestId),
          }),
        );
      } catch (error) {
        console.error('Error fetching card detail:', error);
      }
    };

    fetchCardDetail();
  }, []);

  const handleCloseClick = () => {
    setOpenModalType('');
  };

  const commentInputChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMyCommentInputValue(e.target.value);
  };

  const moreIconClickHandler = () => {
    setIsPressedMoreIcon(!isPressedMoreIcon);
  };

  const deleteOptionClickHandler = () => {
    /** 옵션 삭제하기 버튼을 눌렀을 때 */
  };

  const editOptionclickHandler = () => {
    /** 옵션 수정하기 버튼을 눌렀을 때  */
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

  return (
    <ModalContainer title={cardInfo?.title} ref={ref}>
      {isMobile && (
        <ManagerInfoBox
          managerName={cardInfo?.assignee?.nickname}
          deadline={cardInfo?.dueDate}
        />
      )}
      <div className={styles.rowDiv}>
        <div className={styles.rowDivOne}>
          <div className={styles.allTagsDiv}>
            <StatusTag status="To Do" />
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
          <div className={styles.ImageDiv}>
            {isMobile ? (
              <Image height={133} src={cardImg} alt="card-img" />
            ) : (
              <Image height={205} src={cardImg} alt="card-img" />
            )}
          </div>
          <div className={styles.writeCommentDiv}>
            <p id={styles.title}>댓글</p>
            <div className={styles.myCommentDiv}>
              <textarea
                placeholder="댓글 작성하기"
                className={styles.myCommentTextarea}
                onChange={commentInputChangeHandler}
              />
              {myCommentInputValue && (
                <button type="button" className={styles.inputButton}>
                  입력
                </button>
              )}
            </div>
          </div>
          {COMMENT_INFO.map((comment) => (
            <React.Fragment key={comment.id}>
              <OtherComment
                writer={comment.writer}
                content={comment.content}
                date={comment.date}
              />
            </React.Fragment>
          ))}
        </div>
        {isMobile || (
          <ManagerInfoBox
            managerName={cardInfo?.assignee.nickname}
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
