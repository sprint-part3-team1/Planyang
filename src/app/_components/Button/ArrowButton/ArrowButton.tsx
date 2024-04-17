import Image from 'next/image';
import styles from './ArrowButton.module.css';

const ArrowButton = ({ isActive = true }) => {
  const LEFT_ARROW = '/assets/icons/leftArrow.svg';
  const RIGHT_ARROW = '/assets/icons/rightArrow.svg';
  const LEFT_ARROW_INACTIVE = '/assets/icons/leftArrowInActive.svg';
  const RIGHT_ARROW_INACTIVE = '/assets/icons/rightArrowInActive.svg';
  return (
    <div>
      <button
        type="button"
        className={isActive ? styles.arrowButton : styles.arrowButtonInActive}
      >
        <Image
          width={16}
          height={16}
          src={isActive ? LEFT_ARROW : LEFT_ARROW_INACTIVE}
          alt="leftArrow"
        />
      </button>
      <button
        type="button"
        className={isActive ? styles.arrowButton : styles.arrowButtonInActive}
      >
        <Image
          width={16}
          height={16}
          src={isActive ? RIGHT_ARROW : RIGHT_ARROW_INACTIVE}
          alt="rightArrow"
        />
      </button>
    </div>
  );
};
export default ArrowButton;
