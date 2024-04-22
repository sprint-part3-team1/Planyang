import styles from './RejectButton.module.css';

interface RejectButtonProps {
  onClick: () => void;
}

const RejectButton = ({ onClick }: RejectButtonProps) => {
  return (
    <button type="button" className={styles.rejectBtn} onClick={onClick}>
      거절
    </button>
  );
};

export default RejectButton;
