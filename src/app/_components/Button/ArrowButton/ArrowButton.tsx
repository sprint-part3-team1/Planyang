import Image from 'next/image';
import styles from './ArrowButton.module.css';

interface ArrowButtonProps {
  isActive: boolean;
  onLeftButtonClick: () => void;
  onRightButtonClick: () => void;
}

const ArrowButton = ({
  isActive,
  onLeftButtonClick,
  onRightButtonClick,
}: ArrowButtonProps) => {
  const LEFT_ARROW = '/assets/icons/leftArrow.svg';
  const RIGHT_ARROW = '/assets/icons/rightArrow.svg';
  const LEFT_ARROW_INACTIVE = '/assets/icons/leftArrowInActive.svg';
  const RIGHT_ARROW_INACTIVE = '/assets/icons/rightArrowInActive.svg';

  const handleLeftButtonClick = () => {
    onLeftButtonClick();
  };

  const handleRightButtonClick = () => {
    onRightButtonClick();
  };

  return (
    <div>
      <button
        type="button"
        className={isActive ? styles.arrowButton : styles.arrowButtonInActive}
        onClick={handleLeftButtonClick}
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
        onClick={handleRightButtonClick}
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
