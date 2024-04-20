import React from 'react';

export type DropDownPropsType = {
  title: string;
};

export type StatusTagPropsType = {
  status: string;
};

export type PopupDropDwnPropsType = {
  options: {
    name: string;
    onOptionSelect: () => void;
  }[];
  setIsPressedMoreIcon: React.Dispatch<React.SetStateAction<boolean>>;
};
