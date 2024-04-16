import Image from 'next/image';
import coloredVector from '@/../public/assets/icons/coloredVector.svg';
import styles from './AddColumnButton.module.css';

const AddColumnButton = () => {
  return (
    <button className={styles.addColumnButton}>
      <div className={styles.content}>
        <span>새로운 컬럼 추가하기</span>
        <div className={styles.vectorBox}>
          <Image
            id={styles.coloredVector}
            src={coloredVector}
            alt="coloredVector"
          />
        </div>
      </div>
    </button>
  );
};

export default AddColumnButton;
