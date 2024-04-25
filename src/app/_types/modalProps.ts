import React from 'react';

export type ModalContainerPropsType = {
  title: string;
  children: React.ReactNode | null;
  modalHeight?: number;
};

export type ModalPropsType = {
  openModalType?: string;
  setOpenModalType: React.Dispatch<React.SetStateAction<string>>;
  inputInitialValue?: string;
  requestId?: number;
};

export type ModalPortalPropsType = {
  openModalType: string;
  setOpenModalType: React.Dispatch<React.SetStateAction<string>>;
  inputInitialValue?: string;
  modalText?: string | null;
  requestId?: number;
};

export type CheckCancelButtonPropType = {
  deleteMode?: boolean;
  checkText: string;
  cancelText?: string;
  openModalType?: string;
  setOpenModalType: React.Dispatch<React.SetStateAction<string>>;
  checkButtonHandler?: () => void;
};

export type ModalContentFuncPropsType = {
  modalType: string;
  openModalType?: string;
  setOpenModalType: React.Dispatch<React.SetStateAction<string>>;
  inputInitialValue?: string;
  modalText?: string | null;
  requestId?: number;
};

export type TaskCardModalPropsType = {
  openModalType?: string;
  setOpenModalType: React.Dispatch<React.SetStateAction<string>>;
  requestId?: number;
};
