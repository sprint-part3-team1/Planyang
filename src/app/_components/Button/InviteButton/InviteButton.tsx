import Image from 'next/image';
import styles from './InviteButton.module.css';

const InviteButton = () => {
  const WHITE_VECTOR = '/assets/icons/whiteVector.svg';
  return (
    <button type="button" className={styles.inviteBtn}>
      <div className={styles.content}>
        <Image
          width={16}
          height={16}
          src={WHITE_VECTOR}
          alt="vector"
          className={styles.vector}
        />
        <span>초대하기</span>
      </div>
    </button>
  );
};

export default InviteButton;
