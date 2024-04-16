import { ModalContainerPropsType } from '@/app/_types/modalProps';
import modalTypes from '@/app/constants/modalTypes';
import styles from './ModalContainer.module.css';

const ModalContainer = ({
  title,
  setOpenModalType,
  checkString,
  cancelString,
  children,
  deleteMode,
  modalHeight,
}: ModalContainerPropsType) => {
  const onCancelButtonHandler = () => {
    setOpenModalType('');
  };

  const deleteButtonHandler = () => {
    setOpenModalType(modalTypes.deleteColumnCheck);
  };

  const customSizes = {
    height: modalHeight ? `${modalHeight}rem` : 'auto',
  };

  return (
    <div className={styles.outerContainer} style={customSizes}>
      <p id={styles.title}>{title}</p>
      {children}
      <div className={styles.deleteModeContainer}>
        {deleteMode && (
          <button
            type="button"
            className={styles.deleteButton}
            onClick={deleteButtonHandler}
          >
            <p id={styles.deleteText}>삭제하기</p>
          </button>
        )}
        <div className={styles.buttonContainer}>
          <button
            type="button"
            className={`${styles.button} ${styles.cancleButton}`}
            onClick={onCancelButtonHandler}
          >
            {cancelString}
          </button>
          <button
            type="button"
            className={`${styles.button} ${styles.checkButton}`}
          >
            {checkString}
          </button>
        </div>
      </div>
    </div>
  );
};
export default ModalContainer;
