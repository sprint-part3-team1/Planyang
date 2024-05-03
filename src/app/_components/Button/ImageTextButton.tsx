import React from 'react';
import Image from 'next/image';
import { ImageTextButtonProps } from '@/app/_types/ImageTextButtonProps';
import styles from './ImageTextButton.module.css';

const ImageTextButton = ({
  text,
  imageUrl,
  onClickEvent,
}: ImageTextButtonProps) => {
  return (
    <div className={styles.imageTextButtonWrapper} onClick={onClickEvent}>
      <Image src={imageUrl} alt="gearIcon" width={20} height={20} />
      <div className={styles.textWrapper}>{text}</div>
    </div>
  );
};

export default ImageTextButton;
