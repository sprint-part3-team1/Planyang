import Image from 'next/image';
import styles from './SideMenu.module.css';

interface Props {
  dashBoardData: DashboardData[] | null | undefined;
}

interface DashboardData {
  title: string;
  color: string;
  createdByMe: boolean;
  // 다른 속성들...
}

const SideMenu = ({ dashBoardData }: Props) => {
  const LOGO_IMAGE = '/assets/images/logoImg.svg';
  const LOGO_TITLE = '/assets/images/logoTitle.svg';
  const VECTOR_ICON_SRC = '/assets/icons/vector.svg';
  // const PROFILE_ELLIPSE_ICON_SRC = '/assets/icons/profileEllipse.svg';
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
        {dashBoardData &&
          dashBoardData.map((dashBoard, index) => {
            return (
              <a key={index} className={styles.dashList} href="/">
                <div>
                  <svg
                    width="8"
                    height="8"
                    viewBox="0 0 8 8"
                    fill={dashBoard.color}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="4" cy="4" r="4" />
                  </svg>
                </div>
                <span id={styles.dashBoardName}>{dashBoard.title}</span>
                {dashBoard.createdByMe && (
                  <Image
                    id={styles.crown}
                    width={17.59}
                    height={14}
                    src={CROWN_ICON_SRC}
                    alt="crown"
                  />
                )}
              </a>
            );
          })}
      </div>
    </div>
  );
};

export default SideMenu;
