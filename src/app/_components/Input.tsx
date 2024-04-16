'use client';

import React, { useState } from 'react';
import { InputProps } from '@/app/_types/InputProps';
import styles from './Input.module.css';
import Image from 'next/image';

const Input = ({
  inputName,
  inputType,
  inputWidth,
  errorMessage = null,
  errorState,
}: InputProps) => {
  const INVISIBLE_ICON_SRC = '/assets/icons/Invisible.svg';
  const VISIBLE_ICON_SRC = '/assets/icons/Visible.svg';

  const customWidth = {
    width: inputWidth + 'px',
  };

  const onClickIcon = () => {
    setVisibilityIcon(!visibilityIcon);
  };

  const setInputType = () => {
    if (inputType === 'text') return 'text';

    if (visibilityIcon) {
      return 'password';
    } else {
      return 'text';
    }
  };

  const [visibilityIcon, setVisibilityIcon] = useState(true);

  return (
    <div className={styles.entireWrapper}>
      <label className={styles.inputLabel} htmlFor="Input">
        {inputName}
      </label>
      <div className={styles.inputWrapper} style={customWidth}>
        <input
          id="Input"
          className={`${styles.input} ${errorState ? styles.error : null}`}
          type={setInputType()}
        />
        {inputType === 'password' ? (
          <Image
            className={styles.visibleIcon}
            src={visibilityIcon ? INVISIBLE_ICON_SRC : VISIBLE_ICON_SRC}
            alt="visibleIcon"
            width={24}
            height={24}
            onClick={onClickIcon}
          />
        ) : null}
      </div>
      <div className={styles.errorMessage} hidden={!errorState}>
        {errorMessage}
      </div>
    </div>
  );
};

export default Input;
