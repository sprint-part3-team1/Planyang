import React, { forwardRef, Ref } from 'react';
import { ModalContainerPropsType } from '@/app/_types/modalProps';
import styles from './ModalContainer.module.css';

const ModalContainer = forwardRef(
  (
    { title, children, modalHeight }: ModalContainerPropsType,
    ref: Ref<HTMLDivElement>,
  ) => {
    const customSizes = {
      height: modalHeight ? `${modalHeight}rem` : 'auto',
    };

    return (
      <div ref={ref} className={styles.outerContainer} style={customSizes}>
        <p id={styles.title}>{title}</p>
        {children}
      </div>
    );
  },
);

ModalContainer.displayName = 'ModalContainer';

export default ModalContainer;
