import React from 'react';

export type CheckIconPropsType = {
  fill: string;
};

export type CloseIconPropsType = {
  width?: number;
  height?: number;
  handleCloseClick: () => void;
};

export type MoreIconPropsType = {
  width?: number;
  height?: number;
  handleClick: () => void;
  children?: React.ReactNode;
};
