import React from 'react';
import Image from 'next/image';
import styles from './InputModal.module.css';

/** 임의로 만든 input 입니다. */

type InputModalProps = {
  title: string;
  essential?: boolean;
  type: string;
};

const InputModal = ({ title, essential, type }: InputModalProps) => {
  const LOGO_IMAGE = '/assets/images/logoImg.svg';
  switch (type) {
    case 'multiLine':
      return (
        <div className={styles.container}>
          <p id={styles.title}>
            {title} {essential && <span id={styles.essential}>*</span>}
          </p>
          <textarea
            rows={2}
            className={`${styles.input} ${styles.multiLineInput}`}
          />
        </div>
      );
    case 'image':
      return (
        <div className={styles.imageDiv}>
          <Image src={LOGO_IMAGE} alt="대시보드 이미지" />
        </div>
      );
    default:
      return (
        <div className={styles.container}>
          <p id={styles.title}>
            {title} {essential && <span id={styles.essential}>*</span>}
          </p>
          <input className={styles.input} />
        </div>
      );
  }
};

export default InputModal;
