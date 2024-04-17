import { ModalContainerPropsType } from '@/app/_types/modalProps';
import styles from './ModalContainer.module.css';

const ModalContainer = ({
  title,
  children,
  modalHeight,
}: ModalContainerPropsType) => {
  const customSizes = {
    height: modalHeight ? `${modalHeight}rem` : 'auto',
  };

  return (
    <div className={styles.outerContainer} style={customSizes}>
      <p id={styles.title}>{title}</p>
      {children}
    </div>
  );
};
export default ModalContainer;
