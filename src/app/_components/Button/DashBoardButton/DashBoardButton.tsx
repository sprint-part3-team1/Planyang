import Image from 'next/image';
import styles from './DashBoardButton.module.css';

const DashBoardButton = () => {
  const PROFILE_ELLIPSE_ICON_SRC = '/assets/icons/profileEllipse.svg';
  const CROWN_ICON_SRC = '/assets/icons/crown.svg';
  const RIGHT_ARROW = '/assets/icons/rightArrow.svg';
  return (
    <button type="button" className={styles.dashBoardButton}>
      <div className={styles.content}>
        <div className={styles.nameFrame}>
          <Image
            width={8}
            height={8}
            src={PROFILE_ELLIPSE_ICON_SRC}
            alt="profileEllipse"
          />
          비브리지
          <Image
            id={styles.crown}
            width={20.103}
            height={16}
            src={CROWN_ICON_SRC}
            alt="crown"
          />
        </div>

        <Image width={18} height={18} src={RIGHT_ARROW} alt="crown" />
      </div>
    </button>
  );
};

export default DashBoardButton;
