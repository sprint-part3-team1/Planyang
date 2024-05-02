import React, { useState, useEffect, useRef } from 'react';
import { ModalPropsType } from '@/app/_types/modalProps';
import VIEWPORT_TYPES from '@/app/constants/viewPortTypes';
import ArrowDown from '@/../public/assets/icons/arrowDown.svg';
import useGetViewportSize from '@/app/_hooks/useGetViewportSize';
import { cardActions } from '@/app/_slice/cardSlice';
import { MemberInfoType } from '@/app/_types/dropdownProps';
import useAppDispatch from '@/app/_hooks/useAppDispatch';
import { useParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setChangeCard } from '@/app/_slice/changedCardSlice';
import ModalContainer from '../modalContainer/ModalContainer';
import ManagerDropDown from '../../DropDown/ManagerDropDown';
import Input from '../../Input';
import InputModal from '../inputModal/InputModal';
import CheckCancleButton from '../checkCancleButton/CheckCancleButton';
import styles from './CreateTaskModal.module.css';

const CreateTaskModal = ({ setOpenModalType, requestId }: ModalPropsType) => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const calendarRef = useRef<HTMLInputElement>(null);
  const tagRef = useRef<HTMLInputElement>(null);
  const cardDispatch = useDispatch();

  const [manager, setManager] = useState<MemberInfoType | null | undefined>(
    null,
  );
  const [titleInputValue, setTitleInputValue] = useState('');
  const [descriptionInputValue, setdescriptionInputValue] = useState('');
  const [dueDateValue, setDueDateValue] = useState<string | null | undefined>(
    '',
  );
  const [tagInputValue, setTagInputValue] = useState<
    string[] | null | undefined
  >([]);
  const [selectedImagePath, setSelectedImagePath] = useState<
    string | null | undefined
  >('');

  const imageInputProps = {
    columnId: requestId,
    selectedImagePath,
    setSelectedImagePath,
  };

  const changeCards = () => {
    cardDispatch(setChangeCard(true));
  };

  const unchangeCards = () => {
    cardDispatch(setChangeCard(false));
  };

  const createCard = async (
    assigneeUserId: number,
    title: string,
    description: string,
    dueDate: string | undefined,
    tags: string[] | undefined,
    imageUrl: string | undefined,
  ) => {
    try {
      changeCards();
      await dispatch(
        cardActions.asyncFetchCreateCard({
          assigneeUserId,
          dashboardId: Number(params.id),
          columnId: Number(requestId),
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

  const createTaskButtonHandler = () => {
    if (manager && titleInputValue && descriptionInputValue) {
      createCard(
        manager?.userId,
        titleInputValue,
        descriptionInputValue,
        dueDateValue || undefined,
        tagInputValue || undefined,
        selectedImagePath || undefined,
      );

      setOpenModalType('');
    } else {
      alert('필수 입력값이 누락되었습니다.');
    }
  };

  const INPUT_WIDTH = {
    [VIEWPORT_TYPES.deskTop]: 45,
    [VIEWPORT_TYPES.tablet]: 45,
    [VIEWPORT_TYPES.mobile]: 28.7,
  };

  const viewportType = useGetViewportSize();

  const ref = useRef<HTMLDivElement>(null);
  const [isDownArrowClicked, setIsDownArrowClicked] = useState(false);

  const downArrowButtonHandler = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setIsDownArrowClicked(true);
  };

  const hadleTitleInput = () => {
    if (titleRef.current) {
      setTitleInputValue(titleRef.current.value);
    }
  };

  const handleContentInput = () => {
    if (descriptionRef.current) {
      setdescriptionInputValue(descriptionRef.current.value);
    }
  };

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

  return (
    <ModalContainer title="할 일 생성">
      <div className={styles.container}>
        <ManagerDropDown
          title="담당자"
          clickedMember={manager}
          setClickedMember={setManager}
        />
        <InputModal
          title="제목"
          required
          type="text"
          inputRef={titleRef}
          focusoutFunc={hadleTitleInput}
        />
        <InputModal
          title="설명"
          required
          type="multiLine"
          inputRef={descriptionRef}
          focusoutFunc={handleContentInput}
        />
        <Input
          inputId="calendar input"
          inputRef={calendarRef}
          inputName="마감일"
          inputType="calendar"
          inputWidth={INPUT_WIDTH[viewportType]}
          setDueDateValue={setDueDateValue}
        />
        <Input
          inputId="tag input"
          inputRef={tagRef}
          inputName="태그"
          inputType="tag"
          inputWidth={INPUT_WIDTH[viewportType]}
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
        checkText="생성"
        setOpenModalType={setOpenModalType}
        checkButtonHandler={createTaskButtonHandler}
      />
    </ModalContainer>
  );
};
export default CreateTaskModal;
