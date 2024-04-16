import React from 'react';

export type CheckCancleButtonPropsType = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  CheckString: string;
  CancleString: string;
};

export type ModalPropsType = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};
