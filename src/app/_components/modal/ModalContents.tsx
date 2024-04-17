import React from 'react';
import { ModalContentFuncPropsType } from '@/app/_types/modalProps';
import modalTypes from '@/app/constants/modalTypes';
import NewColumnModal from './NewColumnModal';
import ColumnManageModal from './ColumnManageModal';
import DeleteColumnCheckModal from './DeleteColumnCheckModal';
import NewDashboardModal from './NewDashboardModal';
import ModifyTaskModal from './ModifyTaskModal';
import InviteByEmailModal from './InviteByEmailModal';

const ModalContents = ({
  openModalType,
  setOpenModalType,
}: ModalContentFuncPropsType): React.ReactNode => {
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
    case modalTypes.newDashboard:
      modalContent = (
        <NewDashboardModal
          openModalType={openModalType}
          setOpenModalType={setOpenModalType}
        />
      );
      break;
    case modalTypes.modifyTask:
      modalContent = (
        <ModifyTaskModal
          openModalType={openModalType}
          setOpenModalType={setOpenModalType}
        />
      );
      break;
    case modalTypes.inviteByEmail:
      modalContent = (
        <InviteByEmailModal
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
