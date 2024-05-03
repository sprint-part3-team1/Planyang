import Image from 'next/image';
import styles from './DashBoardButton.module.css';

interface DashBoardButtonProps {
  color: string;
  createdByMe: boolean;
  title: string;
}

const DashBoardButton = ({
  color,
  createdByMe,
  title,
}: DashBoardButtonProps) => {
  // const PROFILE_ELLIPSE_ICON_SRC = '/assets/icons/profileEllipse.svg';
  const CROWN_ICON_SRC = '/assets/icons/crown.svg';
  const RIGHT_ARROW = '/assets/icons/rightArrow.svg';
  return (
    <button type="button" className={styles.dashBoardButton}>
      <div className={styles.content}>
        <div className={styles.nameFrame}>
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill={color}
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="4" cy="4" r="4" />
          </svg>
          {title}
          {createdByMe && (
            <Image
              id={styles.crown}
              width={20.103}
              height={16}
              src={CROWN_ICON_SRC}
              alt="crown"
            />
          )}
        </div>

        <Image width={18} height={18} src={RIGHT_ARROW} alt="rightArrow" />
      </div>
    </button>
  );
};

export default DashBoardButton;
