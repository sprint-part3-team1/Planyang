import { ModalContainerPropsType } from '@/app/_types/modalProps';
import styles from './ModalContainer.module.css';
import modalTypes from '@/app/constants/modalTypes';

const ModalContainer = ({
  title,
  openModalType,
  setOpenModalType,
  checkString,
  cancelString,
  children,
  deleteMode,
  modalWidth,
  modalHeight,
}: ModalContainerPropsType) => {
  const onCancelButtonHandler = () => {
    setOpenModalType('');
  };

  const deleteButtonHandler = () => {
    setOpenModalType(modalTypes.deleteColumnCheck);
  };

  const customSizes = {
    width: modalWidth ? `${modalWidth}rem` : 'auto',
    height: modalHeight ? `${modalHeight}rem` : 'auto',
  };

  return (
    <div className={styles.outerContainer} style={customSizes}>
      <p id={styles.title}>{title}</p>
      {children}
      <div className={styles.deleteModeContainer}>
        {deleteMode && (
          <p id={styles.deleteText} onClick={deleteButtonHandler}>
            삭제모드
          </p>
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
