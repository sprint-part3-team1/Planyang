import styles from './EditButton.module.css';

const EditButton = ({ editButtonHandler }: {editButtonHandler:()=> void }) => {
  return (
    <button
      type="button"
      className={styles.editBtn}
      onClick={() => {
        editButtonHandler();
      }}
    >
      변경
    </button>
  );
};

export default EditButton;
