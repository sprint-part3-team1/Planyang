'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import TagIcon from '@/app/_components/TagIcon';
import { CardProps } from '@/app/_types/CardProps';
import UserIcon from '@/app/_components/UserIcon';
import styles from './Card.module.css';

const Card = ({
  nickname,
  profileImageUrl,
  title,
  tagNameArr,
  date,
  image,
}: CardProps) => {
  const CALENDAR_ICON = '/assets/icons/calendar.svg';

  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
      setIsTablet(window.innerWidth > 767 && window.innerWidth <= 1023);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // 초기 렌더링 시 한 번 호출하여 초기 상태 설정

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={image ? styles.imageContainer : styles.container}>
      {image ? (
        <Image
          id={styles.cardImage}
          width={274}
          height={160}
          src={image}
          alt="image"
        />
      ) : null}

      {isTablet ? (
        <div className={image ? styles.imageTitle : styles.title}>
          <span>{title}</span>
          <div className={image ? styles.imageTag : styles.tag}>
            <div className={styles.tagDetail}>
              {tagNameArr.map((tag, index) => (
                <TagIcon
                  key={index}
                  tagName={tag}
                  tagStyleType={isMobile ? 'smallTag' : 'bigTag'}
                  deleteOption={false}
                />
              ))}
              <div className={styles.detailDate}>
                <Image
                  width={18}
                  height={18}
                  src={CALENDAR_ICON}
                  alt="calendarIcon"
                />
                <span>{date}</span>
              </div>
            </div>
            <UserIcon nickname={nickname} profileImageUrl={profileImageUrl} />
          </div>
        </div>
      ) : (
        <>
          <div className={styles.title}>
            <span>{title}</span>
            <div className={styles.tag}>
              {tagNameArr.map((tag, index) => (
                <TagIcon
                  key={index}
                  tagName={tag}
                  tagStyleType={isMobile ? 'smallTag' : 'bigTag'}
                  deleteOption={false}
                />
              ))}
            </div>
          </div>
          <div className={styles.detail}>
            <div className={styles.detailDate}>
              <Image
                id={styles.calendarIcon}
                width={18}
                height={18}
                src={CALENDAR_ICON}
                alt="calendarIcon"
              />
              <span>{date}</span>
            </div>
            <UserIcon nickname={nickname} profileImageUrl={profileImageUrl} />
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
