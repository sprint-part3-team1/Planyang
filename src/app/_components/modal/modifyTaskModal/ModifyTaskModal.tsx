import React, { useRef, useState, useEffect } from 'react';
import { ModalPropsType } from '@/app/_types/modalProps';
import InputModal from '@/app/_components/modal/inputModal/InputModal';
import VIEWPORT_TYPES from '@/app/constants/viewPortTypes';
import useGetViewportSize from '@/app/_hooks/useGetViewportSize';
import ArrowDown from '@/../public/assets/icons/arrowDown.svg';
import Input from '../../Input';
import styles from './ModifyTaskModal.module.css';
import ModalContainer from '../modalContainer/ModalContainer';
import CheckCancleButton from '../checkCancleButton/CheckCancleButton';
import StatusDropDown from '../../DropDown/StatusDropDown';
import ManagerDropDown from '../../DropDown/ManagerDropDown';

const ModifyTaskModal = ({ setOpenModalType }: ModalPropsType) => {
  const modifyButtonHandler = () => {
    /** 수정 버튼을 누르면 실행하는 함수 작성 */
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
    <ModalContainer title="할 일 수정">
      <div className={styles.container}>
        <div className={styles.twoRowDiv}>
          <StatusDropDown title="상태" />
          <ManagerDropDown title="담당자" />
        </div>
        <Input
          inputName="제목"
          inputType="text"
          inputWidth={INPUT_WIDTH[viewportType]}
        />
        <InputModal title="설명" essential type="multiLine" />
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
        checkText="수정"
        setOpenModalType={setOpenModalType}
        checkButtonHandler={modifyButtonHandler}
      />
    </ModalContainer>
  );
};

export default ModifyTaskModal;
