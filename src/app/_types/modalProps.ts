import React from 'react';

export type ModalContainerPropsType = {
  title: string;
  openModalType: string;
  setOpenModalType: React.Dispatch<React.SetStateAction<string>>;
  checkString: string;
  cancelString: string;
  children: React.ReactNode | null;
  deleteMode?: boolean;
  modalWidth?: number;
  modalHeight?: number;
};

export type ModalPropsType = {
  openModalType: string;
  setOpenModalType: React.Dispatch<React.SetStateAction<string>>;
};

export type ModalPortalPropsType = {
  openModalType: string;
  setOpenModalType: React.Dispatch<React.SetStateAction<string>>;
};
