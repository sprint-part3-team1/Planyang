import Image from 'next/image';
import styles from './AddTodoButton.module.css';

const AddTodoButton = () => {
  const COLORED_VECTOR_ICON = '/assets/icons/coloredVector.svg';
  return (
    <button type="button" className={styles.addTodoButton}>
      <div className={styles.content}>
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

export default AddTodoButton;
