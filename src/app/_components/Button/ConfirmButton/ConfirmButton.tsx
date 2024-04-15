import styles from './ConfirmButton.module.css';

const ConfirmButton = () => {
  return (
    <div className={styles.container}>
      <button type="button" className={styles.acceptBtn}>
        수락
      </button>
      <button type="button" className={styles.rejectBtn}>
        거절
      </button>
    </div>
  );
};

export default ConfirmButton;
