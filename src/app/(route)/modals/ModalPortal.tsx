import React from 'react';
import { createPortal } from 'react-dom';
import { ModalPortalPropsType } from '@/app/_types/modalProps';
import modalTypes from '@/app/constants/modalTypes';
import ColumnManageModal from '@/app/(route)/modals/ColumnManageModal';
import NewColumnModal from '@/app/(route)/modals/NewColumnModal';
import DeleteColumnCheckModal from '@/app/(route)/modals/DeleteColumnCheckModal';

import styles from './ModalPortal.module.css';

const ModalPortal = ({
  openModalType,
  setOpenModalType,
}: ModalPortalPropsType) => {
  if (openModalType === '') return 'null';

  let modalContent: React.ReactNode = null;

  switch (openModalType) {
    case modalTypes.newColumn:
      modalContent = (
        <NewColumnModal
          openModalType={openModalType}
          setOpenModalType={setOpenModalType}
        />
      );
      break;
    case modalTypes.columnManagement:
      modalContent = (
        <ColumnManageModal
          openModalType={openModalType}
          setOpenModalType={setOpenModalType}
        />
      );
      break;
    case modalTypes.deleteColumnCheck:
      modalContent = (
        <DeleteColumnCheckModal
          openModalType={openModalType}
          setOpenModalType={setOpenModalType}
        />
      );
      break;
    default:
      break;
  }

  return createPortal(
    <div className={styles.modalBackground}>{modalContent}</div>,
    document.getElementById('modal-root') as HTMLElement,
  );
};
export default ModalPortal;
