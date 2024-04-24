import React from 'react';
import landingCard1 from '@/../public/assets/images/landingCard1.png';
import landingCard2 from '@/../public/assets/images/landingCard2.png';
import Image from 'next/image';
import styles from './PointCards.module.css';

const PointCards = () => {
  return (
    <div className={styles.container}>
      <div className={styles.cardFrame}>
        <div className={styles.contentBox}>
          <p className={styles.pointText}>Point 1</p>
          <p className={styles.contentText}>
            일의 우선순위를 <br />
            관리하세요
          </p>
        </div>
        <div className={styles.imageBox}>
          <Image fill src={landingCard1} alt="랜딩페이지 카드1" />
        </div>
      </div>
      <div className={styles.cardFrame2}>
        <div className={`${styles.contentBox} ${styles.tablet}`}>
          <p className={styles.pointText}>Point 2</p>
          <p className={styles.contentText}>
            해야 할 일을 <br />
            등록하세요
          </p>
        </div>
        <div className={styles.imageBox}>
          <Image fill src={landingCard2} alt="랜딩페이지 카드2" />
        </div>
        <div className={styles.contentBox}>
          <p className={styles.pointText}>Point 2</p>
          <p className={styles.contentText}>
            해야 할 일을 <br />
            등록하세요
          </p>
        </div>
      </div>
    </div>
  );
};

export default PointCards;
