import React, { SetStateAction } from 'react';
import styles from './CustomModal.module.css';
import ModalContainer from '../modalContainer/ModalContainer';
import CheckCancleButton from '../checkCancleButton/CheckCancleButton';

const CustomModal = ({
  modalText,
  setOpenModalType,
}: {
  modalText: string | undefined | null;
  setOpenModalType: React.Dispatch<SetStateAction<string>>;
}) => {
  const checkButtonHandler = () => {
    setOpenModalType('');
  };
  return (
    <ModalContainer title="">
      <p className={styles.contentText}>{modalText}</p>
      <CheckCancleButton
        checkText="확인"
        cancelText=""
        setOpenModalType={setOpenModalType}
        checkButtonHandler={checkButtonHandler}
      />
    </ModalContainer>
  );
};

export default CustomModal;
