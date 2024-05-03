import React from 'react';
import ModalContainer from '@/app/_components/modal/modalContainer/ModalContainer';
import { ModalPropsType } from '@/app/_types/modalProps';
import useAppDispatch from '@/app/_hooks/useAppDispatch';
import { columnActions } from '@/app/_slice/columnSlice';
import styles from './DeleteColumnCheckModal.module.css';
import CheckCancleButton from '../checkCancleButton/CheckCancleButton';

const DeleteColumnCheckModal = ({
  setOpenModalType,
  requestId,
}: ModalPropsType) => {
  const dispatch = useAppDispatch();

  const deleteColumn = async (columnId: number) => {
    try {
      await dispatch(columnActions.asyncFetchDeleteColumn({ columnId }));
    } catch (error) {
      console.error('Error delete column:', error);
    }
  };
  const deleteButtonHandler = () => {
    deleteColumn(Number(requestId));
  };

  return (
    <ModalContainer title="" modalHeight={25}>
      <div className={styles.deleteText}>컬럼의 모든 카드가 삭제됩니다.</div>
      <CheckCancleButton
        checkText="삭제"
        setOpenModalType={setOpenModalType}
        checkButtonHandler={deleteButtonHandler}
      />
    </ModalContainer>
  );
};

export default DeleteColumnCheckModal;
