import Image from 'next/image';
import { dashBoardDetailData } from '@/app/_slice/dashBoardDetail';
import styles from './ArrowButton.module.css';

interface ArrowButtonProps {
  isLeftActive?: boolean;
  isRightActive?: boolean;
  onLeftButtonClick: () => void;
  onRightButtonClick: () => void;
}

const ArrowButton = ({
  isLeftActive,
  isRightActive,
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
        className={
          isLeftActive ? styles.arrowButton : styles.arrowButtonInActive
        }
        onClick={handleLeftButtonClick}
      >
        <Image
          width={16}
          height={16}
          src={isLeftActive ? LEFT_ARROW : LEFT_ARROW_INACTIVE}
          alt="leftArrow"
        />
      </button>
      <button
        type="button"
        className={
          isRightActive ? styles.arrowButton : styles.arrowButtonInActive
        }
        onClick={handleRightButtonClick}
      >
        <Image
          width={16}
          height={16}
          src={isRightActive ? RIGHT_ARROW : RIGHT_ARROW_INACTIVE}
          alt="rightArrow"
        />
      </button>
    </div>
  );
};
export default ArrowButton;
