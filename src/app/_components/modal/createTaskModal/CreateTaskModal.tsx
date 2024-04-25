import React, { useState, useEffect, useRef } from 'react';
import { ModalPropsType } from '@/app/_types/modalProps';
import VIEWPORT_TYPES from '@/app/constants/viewPortTypes';
import ArrowDown from '@/../public/assets/icons/arrowDown.svg';
import useGetViewportSize from '@/app/_hooks/useGetViewportSize';
import ModalContainer from '../modalContainer/ModalContainer';
import ManagerDropDown from '../../DropDown/ManagerDropDown';
import Input from '../../Input';
import InputModal from '../inputModal/InputModal';
import CheckCancleButton from '../checkCancleButton/CheckCancleButton';
import styles from './CreateTaskModal.module.css';

const CreateTaskModal = ({ setOpenModalType }: ModalPropsType) => {
  const createTaskButtonHandler = () => {
    /** 생성 버튼을 누르면 실행되는 함수 작성 */
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
        <ManagerDropDown title="담당자" />
        <InputModal title="제목" required type="text" />
        <InputModal title="설명" required type="multiLine" />
        <Input
          inputName="마감일"
          inputType="calendar"
          inputWidth={INPUT_WIDTH[viewportType]}
        />
        <Input
          inputName="태그"
          inputType="tag"
          inputWidth={INPUT_WIDTH[viewportType]}
        />
        <InputModal title="이미지" type="image" ref={ref} />
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
