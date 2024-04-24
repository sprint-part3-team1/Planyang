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
};

export type ModalPortalPropsType = {
  openModalType: string;
  setOpenModalType: React.Dispatch<React.SetStateAction<string>>;
  inputInitialValue?: string;
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
};

export type TaskCardModalPropsType = {
  openModalType?: string;
  setOpenModalType: React.Dispatch<React.SetStateAction<string>>;
};
