import styles from './CancelButton.module.css';

const CancelButton = ({
  boardId,
  invitationId,
  handleDeleteAndNavigate,
}: {
  boardId: string | undefined | number;
  invitationId: number;
  handleDeleteAndNavigate: any;
}) => {
  const handleCancleButton = (
    boardId: string | undefined | number,
    invitationId: number,
  ) => {
    handleDeleteAndNavigate(boardId, invitationId);
  };
  return (
    <button
      type="button"
      className={styles.cancelBtn}
      onClick={() => {
        handleCancleButton(boardId, invitationId);
      }}
    >
      취소
    </button>
  );
};

export default CancelButton;
