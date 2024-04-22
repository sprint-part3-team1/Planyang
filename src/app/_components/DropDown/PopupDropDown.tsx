import React, { useEffect, useRef } from 'react';
import { PopupDropDwnPropsType } from '@/app/_types/dropdownProps';
import styles from './PopupDropDown.module.css';

const PopupDropDown = ({
  options,
  setIsPressedMoreIcon,
}: PopupDropDwnPropsType) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutSide = (e: MouseEvent) => {
      const target = e.target as Node;
      if (ref.current && !ref.current.contains(target)) {
        setIsPressedMoreIcon(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutSide);

    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    };
  }, [setIsPressedMoreIcon]);
  return (
    <div className={styles.container} ref={ref}>
      {options.map((option) => (
        <button
          key={option.name}
          className={styles.optionButton}
          onClick={option.onOptionSelect}
          type="button"
        >
          {option.name}
        </button>
      ))}
    </div>
  );
};
export default PopupDropDown;
