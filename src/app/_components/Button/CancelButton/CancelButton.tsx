import styles from './CancelButton.module.css';

const CancelButton = () => {
  return (
    <button type="button" className={styles.cancelBtn}>
      취소
    </button>
  );
};

export default CancelButton;
