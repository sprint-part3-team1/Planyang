import React, { SetStateAction, useRef } from 'react';
import styles from './CustomModal.module.css';
import { useOutsideClick } from '@/app/_hooks/useOutsideClick';
import ModalContainer from '../modalContainer/ModalContainer';
import CheckCancleButton from '../checkCancleButton/CheckCancleButton';

const CustomModal = ({
  modalText,
  setOpenModalType,
  checkButtonHandler = () => {},
}: {
  modalText: string | undefined | null;
  setOpenModalType: React.Dispatch<SetStateAction<string>>;
  checkButtonHandler?: () => void; // default Props 정의 시 오류가 발생해서 그대로 두었습니다.
}) => {
  const checkButtonFunc = () => {
    checkButtonHandler?.();
    setOpenModalType('');
  };
  const modalContainerRef = useRef<HTMLDivElement>(null);

  const clickOutsideHandler = () => {
    setOpenModalType('');
  };

  useOutsideClick(modalContainerRef, clickOutsideHandler);
  return (
    <ModalContainer title="" ref={modalContainerRef}>
      <p className={styles.contentText}>{modalText}</p>

      <CheckCancleButton
        checkText="확인"
        cancelText=""
        setOpenModalType={setOpenModalType}
        checkButtonHandler={checkButtonFunc}
      />
    </ModalContainer>
  );
};

export default CustomModal;
