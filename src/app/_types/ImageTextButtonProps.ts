import { MouseEventHandler } from 'react';

export interface ImageTextButtonProps {
  text: string;
  imageUrl: string;
  onClickEvent?: MouseEventHandler<HTMLDivElement>;
}
