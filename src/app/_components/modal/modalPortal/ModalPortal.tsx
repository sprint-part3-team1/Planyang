import React from 'react';
import { createPortal } from 'react-dom';
import { ModalPortalPropsType } from '@/app/_types/modalProps';
import styles from './ModalPortal.module.css';
import ModalContents from '../ModalContents';

const ModalPortal = ({
  openModalType,
  setOpenModalType,
  inputInitialValue,
  modalText,
}: ModalPortalPropsType) => {
  if (openModalType === '') return null;

  const modalContent = ModalContents({
    modalType: openModalType,
    openModalType,
    setOpenModalType,
    inputInitialValue,
    modalText,
  });

  return createPortal(
    <div className={styles.modalBackground}>{modalContent}</div>,
    document.getElementById('modal-root') as HTMLElement,
  );
};
export default ModalPortal;
