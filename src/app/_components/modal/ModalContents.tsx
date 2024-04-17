import React from 'react';
import { ModalContentFuncPropsType } from '@/app/_types/modalProps';
import MODAL_TYPES from '@/app/constants/modalTypes';
import NewColumnModal from './NewColumnModal';
import ColumnManageModal from './ColumnManageModal';
import DeleteColumnCheckModal from './DeleteColumnCheckModal';
import NewDashboardModal from './NewDashboardModal';
import ModifyTaskModal from './ModifyTaskModal';
import InviteByEmailModal from './InviteByEmailModal';
import WrongPasswordModal from './WrongPasswordModal';

const ModalContents = ({
  openModalType,
  setOpenModalType,
}: ModalContentFuncPropsType): React.ReactNode => {
  let modalContent: React.ReactNode = null;
  switch (openModalType) {
    case MODAL_TYPES.newColumn:
      modalContent = (
        <NewColumnModal
          openModalType={openModalType}
          setOpenModalType={setOpenModalType}
        />
      );

      break;
    case MODAL_TYPES.columnManagement:
      modalContent = (
        <ColumnManageModal
          openModalType={openModalType}
          setOpenModalType={setOpenModalType}
        />
      );
      break;
    case MODAL_TYPES.deleteColumnCheck:
      modalContent = (
        <DeleteColumnCheckModal
          openModalType={openModalType}
          setOpenModalType={setOpenModalType}
        />
      );
      break;
    case MODAL_TYPES.newDashboard:
      modalContent = (
        <NewDashboardModal
          openModalType={openModalType}
          setOpenModalType={setOpenModalType}
        />
      );
      break;
    case MODAL_TYPES.modifyTask:
      modalContent = (
        <ModifyTaskModal
          openModalType={openModalType}
          setOpenModalType={setOpenModalType}
        />
      );
      break;
    case MODAL_TYPES.inviteByEmail:
      modalContent = (
        <InviteByEmailModal
          openModalType={openModalType}
          setOpenModalType={setOpenModalType}
        />
      );
      break;
    case MODAL_TYPES.wrongPassword:
      modalContent = (
        <WrongPasswordModal
          openModalType={openModalType}
          setOpenModalType={setOpenModalType}
        />
      );
      break;
    default:
      break;
  }

  return modalContent;
};

export default ModalContents;
