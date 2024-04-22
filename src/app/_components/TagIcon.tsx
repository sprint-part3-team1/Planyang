import React from 'react';
import styles from './TagIcon.module.css';
import Image from 'next/image';
import { TagIconProps } from '@/app/_types/TagIconProps';
import { createRandomColor } from '@/app/_utils/colorUtils';

const TagIcon = ({
  tagName,
  tagStyleType,
  deleteOption,
  onValueChange,
}: TagIconProps) => {
  const backgroundColor = createRandomColor(tagName);
  const textColor = createRandomColor(tagName, 40);

  const tagIconStyle = {
    backgroundColor: backgroundColor,
    color: textColor,
  };

  const sendDeleteOrder = (e: React.MouseEvent<HTMLImageElement>) => {
    onValueChange(e.currentTarget.id);
  };

  return (
    <div
      className={`${styles.tagIconWrapper} ${styles[tagStyleType]}`}
      style={tagIconStyle}
    >
      {tagName}
      {deleteOption ? (
        <Image
          id={tagName}
          src="/assets/icons/cross.svg"
          alt="crossIcon"
          width={12}
          height={12}
          onClick={sendDeleteOrder}
        />
      ) : null}
    </div>
  );
};

export default TagIcon;
