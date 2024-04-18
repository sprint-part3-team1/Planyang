import React, { useState, useRef, useEffect } from 'react';
import styles from './InputModal.module.css';
import ArrowDown from '../../../../public/assets/icons/arrowDown.svg';

/** 임의로 만든 input 입니다. */

type InputModalProps = {
  title: string;
  essential: boolean;
  type: string;
};

const InputModal = ({ title, essential, type }: InputModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    console.log(isOpen);
    const onClick = (e: Event) => {
      if (ref.current !== null && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener('click', onClick);
    }

    return () => {
      window.removeEventListener('click', onClick);
    };
  }, [isOpen]);

  const dropDownHandler = () => {
    setIsOpen(!isOpen);
  };

  switch (type) {
    case 'dropDown':
      return (
        <div className={styles.container} ref={ref}>
          <p id={styles.title}>
            {title} {essential && <span id={styles.essential}>*</span>}
          </p>
          <div className={styles.drowDownDiv}>
            <button
              onClick={dropDownHandler}
              type="button"
              className={styles.drowDownButton}
            >
              {' '}
              <ArrowDown />
            </button>
          </div>
        </div>
      );
    case 'multiLine':
      return (
        <div className={styles.container}>
          <p id={styles.title}>
            {title} {essential && <span id={styles.essential}>*</span>}
          </p>
          <textarea
            rows={3}
            className={`${styles.input} ${styles.multiLineInput}`}
          />
        </div>
      );
    case 'date':
      return (
        <div className={styles.container}>
          <p id={styles.title}>
            {title} {essential && <span id={styles.essential}>*</span>}
          </p>
          <input className={styles.input} type="datetime-local" />
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
