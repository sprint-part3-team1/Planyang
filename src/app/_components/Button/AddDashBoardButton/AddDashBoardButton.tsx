import Image from 'next/image';
import styles from './AddDashBoardButton.module.css';

const AddDashBoardButton = () => {
  const COLORED_VECTOR_ICON = '/assets/icons/coloredVector.svg';
  return (
    <button type="button" className={styles.addDashBoardButton}>
      <div className={styles.content}>
        <span>새로운 대시보드</span>
        <div className={styles.vectorBox}>
          <Image
            width={16}
            height={16}
            id={styles.coloredVector}
            src={COLORED_VECTOR_ICON}
            alt="coloredVector"
          />
        </div>
      </div>
    </button>
  );
};

export default AddDashBoardButton;
