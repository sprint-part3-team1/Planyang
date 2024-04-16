import Image from 'next/image';
import styles from './AddColumnButton.module.css';

const AddColumnButton = () => {
  const COLORED_VECTOR_ICON = '/assets/icons/coloredVector.svg';
  return (
    <button className={styles.addColumnButton}>
      <div className={styles.content}>
        <span>새로운 컬럼 추가하기</span>
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

export default AddColumnButton;
