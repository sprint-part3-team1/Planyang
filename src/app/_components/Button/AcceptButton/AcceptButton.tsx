import styles from './AcceptButton.module.css';

interface AcceptButtonProps {
  onClick: () => void;
}

const AcceptButton = ({ onClick }: AcceptButtonProps) => {
  return (
    <button type="button" className={styles.acceptBtn} onClick={onClick}>
      수락
    </button>
  );
};

export default AcceptButton;
