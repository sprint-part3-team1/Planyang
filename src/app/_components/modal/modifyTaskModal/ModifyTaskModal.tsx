import React, { useRef, useState, useEffect } from 'react';
import { ModalPropsType } from '@/app/_types/modalProps';
import { useOutsideClick } from '@/app/_hooks/useOutsideClick';
import InputModal from '@/app/_components/modal/inputModal/InputModal';
import VIEWPORT_TYPES from '@/app/constants/viewPortTypes';
import useGetViewportSize from '@/app/_hooks/useGetViewportSize';
import ArrowDown from '@/../public/assets/icons/arrowDown.svg';
import useAppDispatch from '@/app/_hooks/useAppDispatch';
import { cardActions } from '@/app/_slice/cardSlice';
import useAppSelector from '@/app/_hooks/useAppSelector';
import { MemberInfoType } from '@/app/_types/dropdownProps';
import { memberActions, memberData } from '@/app/_slice/memberSlice';
import MODAL_TYPES from '@/app/constants/modalTypes';
import {
  cardDetailActions,
  cardDetailData,
} from '@/app/_slice/cardDetailSlice';
import { useDispatch } from 'react-redux';
import { setChangeCard } from '@/app/_slice/changedCardSlice';
import Input from '../../Input';
import styles from './ModifyTaskModal.module.css';
import ModalContainer from '../modalContainer/ModalContainer';
import CheckCancleButton from '../checkCancleButton/CheckCancleButton';
import StatusDropDown from '../../DropDown/StatusDropDown';
import ManagerDropDown from '../../DropDown/ManagerDropDown';

const ModifyTaskModal = ({ setOpenModalType, requestId }: ModalPropsType) => {
  const INPUT_WIDTH = {
    [VIEWPORT_TYPES.deskTop]: 45,
    [VIEWPORT_TYPES.tablet]: 45,
    [VIEWPORT_TYPES.mobile]: 28.7,
  };

  const dispatch = useAppDispatch();
  const cardInfo = useAppSelector(cardDetailData);
  const memberDataList = useAppSelector(memberData);
  const cardDispatch = useDispatch();

  const managerIndex = memberDataList?.members.findIndex(
    (member) => cardInfo?.assignee && member.userId === cardInfo.assignee.id,
  );
  const viewportType = useGetViewportSize();

  const ref = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const calendarRef = useRef<HTMLInputElement>(null);
  const tagRef = useRef<HTMLInputElement>(null);

  const [isDownArrowClicked, setIsDownArrowClicked] = useState(false);
  const [statusColumnId, setStatusColumnId] = useState(cardInfo?.columnId);
  const [manager, setManager] = useState<MemberInfoType | null | undefined>(
    managerIndex !== undefined ? memberDataList?.members[managerIndex] : null,
  );
  const [titleInputValue, setTitleInputValue] = useState(cardInfo?.title);
  const [descriptionInputValue, setdescriptionInputValue] = useState(
    cardInfo?.description,
  );
  const [dueDateValue, setDueDateValue] = useState(cardInfo?.dueDate);
  const [tagInputValue, setTagInputValue] = useState<
    string[] | undefined | null
  >(cardInfo?.tags);
  const [selectedImagePath, setSelectedImagePath] = useState(
    cardInfo?.imageUrl,
  );

  const imageInputProps = {
    columnId: cardInfo?.columnId,
    selectedImagePath,
    setSelectedImagePath,
  };

  const changeCards = () => {
    cardDispatch(setChangeCard(true));
  };

  const unchangeCards = () => {
    cardDispatch(setChangeCard(false));
  };

  const updateCard = async (
    columnId: number,
    assigneeUserId: number,
    cardId: number,
    title: string,
    description: string,
    dueDate: string | undefined,
    tags: string[] | undefined,
    imageUrl: string | null,
  ) => {
    try {
      changeCards();
      await dispatch(
        cardActions.asyncFetchPutCard({
          columnId,
          assigneeUserId,
          cardId,
          title,
          description,
          dueDate,
          tags,
          imageUrl,
        }),
      );
    } catch (error) {
      console.error('Error create card:', error);
    } finally {
      unchangeCards();
    }
  };

  const modifyButtonHandler = () => {
    if (titleInputValue && descriptionInputValue) {
      updateCard(
        Number(statusColumnId),
        Number(manager?.userId),
        Number(requestId),
        titleInputValue,
        descriptionInputValue,
        dueDateValue || undefined,
        tagInputValue || [],
        selectedImagePath || null,
      );
    }
    setOpenModalType(MODAL_TYPES.taskCard);
  };

  const downArrowButtonHandler = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setIsDownArrowClicked(true);
  };

  const handleTitleInput = () => {
    if (titleRef.current) {
      setTitleInputValue(titleRef.current.value);
    }
  };

  const handleDescriptionInput = () => {
    if (descriptionRef.current) {
      setdescriptionInputValue(descriptionRef.current.value);
    }
  };

  useEffect(() => {
    if (titleRef.current && titleInputValue) {
      titleRef.current.value = titleInputValue;
    }
  }, []);

  useEffect(() => {
    if (descriptionRef.current && descriptionInputValue) {
      descriptionRef.current.value = descriptionInputValue;
    }
  }, []);

  useEffect(() => {
    const fetchCardDetail = async () => {
      try {
        await dispatch(
          cardDetailActions.asyncFetchGetCard({
            cardId: Number(requestId),
          }),
        );
      } catch (error) {
        console.error('Error fetching card detail:', error);
      }
    };

    fetchCardDetail();
  }, [requestId, dispatch]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        if (cardInfo) {
          await dispatch(
            memberActions.asyncGetMembers({
              dashboardId: Number(cardInfo.dashboardId),
              page: 1,
            }),
          );
        }
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    fetchMembers();
  }, [cardInfo, dispatch]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsDownArrowClicked(true);
        } else {
          setIsDownArrowClicked(false);
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const handleOutsideClick = () => {};
  const handleClickInsideModal = (e: any) => {
    e.stopPropagation();
  };

  useOutsideClick(modalRef, handleOutsideClick);

  return (
    <div onClick={handleClickInsideModal}>
      <ModalContainer title="할 일 수정" ref={modalRef}>
        <div className={styles.container} onClick={handleClickInsideModal}>
          <div className={styles.twoRowDiv}>
            <StatusDropDown
              title="상태"
              setStatusColumnId={setStatusColumnId}
              columnId={cardInfo?.columnId}
            />
            <ManagerDropDown
              title="담당자"
              clickedMemberIndex={managerIndex}
              setClickedMember={setManager}
            />
          </div>
          <InputModal
            title="제목"
            required
            type="text"
            inputRef={titleRef}
            focusoutFunc={handleTitleInput}
          />
          <InputModal
            title="설명"
            required
            type="multiLine"
            inputRef={descriptionRef}
            focusoutFunc={handleDescriptionInput}
          />
          <Input
            inputId="calendar input"
            inputName="마감일"
            inputType="calendar"
            inputWidth={INPUT_WIDTH[viewportType]}
            inputRef={calendarRef}
            dueDateValue={dueDateValue}
            setDueDateValue={setDueDateValue}
          />
          <Input
            inputId="tag input"
            inputName="태그"
            inputType="tag"
            inputWidth={INPUT_WIDTH[viewportType]}
            inputRef={tagRef}
            tagInputValue={tagInputValue}
            setTagInputValue={setTagInputValue}
          />
          <InputModal
            title="이미지"
            type="image"
            ref={ref}
            imageInputProps={imageInputProps}
          />
          <div
            role="button"
            tabIndex={0}
            aria-label="Scroll down"
            className={`${styles.downArrowDiv} ${isDownArrowClicked ? styles.clicked : styles.moving}`}
            onClick={downArrowButtonHandler}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                downArrowButtonHandler();
              }
            }}
          >
            <ArrowDown />
          </div>
        </div>
        <CheckCancleButton
          checkText="수정"
          setOpenModalType={setOpenModalType}
          checkButtonHandler={modifyButtonHandler}
        />
      </ModalContainer>
    </div>
  );
};

export default ModifyTaskModal;
