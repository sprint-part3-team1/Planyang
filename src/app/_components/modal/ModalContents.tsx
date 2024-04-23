import React from 'react';
import { ModalContentFuncPropsType } from '@/app/_types/modalProps';
import MODAL_TYPES from '@/app/constants/modalTypes';
import NewColumnModal from './newColumnModal/NewColumnModal';
import ColumnManageModal from './columnManagerModal/ColumnManageModal';
import DeleteColumnCheckModal from './deleteColumnCheckModal/DeleteColumnCheckModal';
import NewDashboardModal from './newDashboardModal/NewDashboardModal';
import ModifyTaskModal from './modifyTaskModal/ModifyTaskModal';
import InviteByEmailModal from './inviteByEmailModal/InviteByEmailModal';
import WrongPasswordModal from './wrongPasswordModal/WrongPasswordModal';
import CreateTaskModal from './createTaskModal/CreateTaskModal';
import TaskCardModal from './taskCardModal/TaskCardModal';
import WrongPasswordLoginModal from './wrongPasswordLoginModal/WrongPasswordLoginModal';
import SignupModal from './signupModal/SignupModal';

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
    case MODAL_TYPES.createTask:
      modalContent = (
        <CreateTaskModal
          openModalType={openModalType}
          setOpenModalType={setOpenModalType}
        />
      );
      break;
    case MODAL_TYPES.taskCard:
      modalContent = (
        <TaskCardModal
          openModalType={openModalType}
          setOpenModalType={setOpenModalType}
        />
      );
      break;
    case MODAL_TYPES.wrongPasswordLogin:
      modalContent = (
        <WrongPasswordLoginModal
          openModalType={openModalType}
          setOpenModalType={setOpenModalType}
        />
      );
      break;
    case MODAL_TYPES.signup:
      modalContent = (
        <SignupModal
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
