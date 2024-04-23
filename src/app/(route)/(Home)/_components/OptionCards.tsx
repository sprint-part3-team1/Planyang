import React from 'react';
import Image from 'next/image';
import styles from './OptionCards.module.css';

const OptionCards = () => {
  const CARD1 = '/assets/images/landingOptionCard1.png';
  const CARD2 = '/assets/images/landingOptionCard2.png';
  const CARD3 = '/assets/images/landingOptionCard3.png';

  const CARDS_INFO = [
    {
      title: '대시보드 설정',
      content: '대시보드 사진과 이름을 변경할 수 있어요.',
      imageUrl: CARD1,
      imageHeight: 124,
    },
    {
      title: '초대',
      content: '새로운 팀원을 초대할 수 있어요.',
      imageUrl: CARD2,
      imageHeight: 230,
    },
    {
      title: '구성원',
      content: '구성원을 초대하고 내보낼 수 있어요.',
      imageUrl: CARD3,
      imageHeight: 195,
    },
  ];

  return (
    <div className={styles.container}>
      <p id={styles.title}>생산성을 높이는 다양한 설정 ⚡</p>
      <div className={styles.cardsDiv}>
        {CARDS_INFO.map((card) => {
          return (
            <div className={styles.cardFrame} key={card.title}>
              <div className={styles.imageDiv}>
                <Image
                  width={300}
                  height={card.imageHeight}
                  src={card.imageUrl}
                  alt="카드"
                />
              </div>
              <div className={styles.contentDiv}>
                <p className={styles.title}>{card.title}</p>
                <p className={styles.content}>{card.content}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OptionCards;
