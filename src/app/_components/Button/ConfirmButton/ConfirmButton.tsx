import styles from './ConfirmButton.module.css';

const ConfirmButton = () => {
  return (
    <div className={styles.container}>
      <button className={styles.acceptBtn}>수락</button>
      <button className={styles.rejectBtn}>거절</button>
    </div>
  );
};

export default ConfirmButton;
