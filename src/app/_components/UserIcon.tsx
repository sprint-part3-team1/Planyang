import React from 'react';
import { UserIconProps } from '@/app/_types/UserIconProps';
import { createRandomColor } from '@/app/_utils/colorUtils';
import styles from './UserIcon.module.css';

const UserIcon = ({ nickname, profileImageUrl }: UserIconProps) => {
  const customImage = () => {
    const backgroundColor = createRandomColor(nickname);

    if (profileImageUrl != null) {
      return {
        backgroundImage: `url(${profileImageUrl})`,
      };
    }
    return {
      backgroundColor,
    };
  };

  return (
    <div className={styles.iconWrapper} style={customImage()}>
      {profileImageUrl == null ? nickname.at(0) : null}
    </div>
  );
};

export default UserIcon;
