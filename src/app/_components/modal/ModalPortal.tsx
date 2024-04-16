import React from 'react';
import { createPortal } from 'react-dom';
import styles from './ModalPortal.module.css';

type ModalPropsType = {
  openModal: boolean;
  children: React.ReactNode;
};

const ModalPortal = ({ openModal, children }: ModalPropsType) => {
  if (!openModal) return null;

  return createPortal(
    <div className={styles.modalBackground}>{children}</div>,
    document.getElementById('modal-root') as HTMLElement,
  );
};
export default ModalPortal;
