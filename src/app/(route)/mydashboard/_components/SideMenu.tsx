import Image from 'next/image';
import styles from './SideMenu.module.css';

const SideMenu = () => {
  const LOGO_IMAGE = '/assets/images/logoImg.svg';
  const LOGO_TITLE = '/assets/images/logoTitle.svg';
  const VECTOR_ICON_SRC = '/assets/icons/vector.svg';
  const PROFILE_ELLIPSE_ICON_SRC = '/assets/icons/profileEllipse.svg';
  const CROWN_ICON_SRC = '/assets/icons/crown.svg';
  return (
    <div className={styles.container}>
      <div className={styles.logoFrame}>
        <a href="/mydashboard">
          <Image
            width={28.815}
            height={33.069}
            src={LOGO_IMAGE}
            alt="logoImg"
          />
          <Image
            width={80}
            height={22}
            id={styles.logoTitle}
            src={LOGO_TITLE}
            alt="logoTitle"
          />
        </a>
      </div>
      <div className={styles.titleWrapper}>
        <span id={styles.title}>Dash Boards</span>
        <Image
          width={20}
          height={20}
          id={styles.vector}
          src={VECTOR_ICON_SRC}
          alt="vector"
        />
        {/* onClick 모달창 연결 */}
      </div>

      <div className={styles.listWrapper}>
        {/* 반복문으로 대시보드 띄워주기 */}
        <a className={styles.dashList} href="/">
          <div>
            <Image
              width={8}
              height={8}
              src={PROFILE_ELLIPSE_ICON_SRC}
              alt="profileEllipse"
            />
          </div>
          <span id={styles.dashBoardName}>대시보드1</span>
          <Image
            id={styles.crown}
            width={17.59}
            height={14}
            src={CROWN_ICON_SRC}
            alt="crown"
          />
        </a>
        <a className={styles.dashList} href="/">
          <div>
            <Image
              width={8}
              height={8}
              src={PROFILE_ELLIPSE_ICON_SRC}
              alt="profileEllipse"
            />
          </div>
          <span id={styles.dashBoardName}>대시보드2</span>
          <Image
            id={styles.crown}
            width={17.59}
            height={14}
            src={CROWN_ICON_SRC}
            alt="crown"
          />
        </a>
        <a className={styles.dashList} href="/">
          <div>
            <Image
              width={8}
              height={8}
              src={PROFILE_ELLIPSE_ICON_SRC}
              alt="profileEllipse"
            />
          </div>
          <span id={styles.dashBoardName}>대시보드3</span>
          <Image
            id={styles.crown}
            width={17.59}
            height={14}
            src={CROWN_ICON_SRC}
            alt="crown"
          />
        </a>
      </div>
    </div>
  );
};

export default SideMenu;
