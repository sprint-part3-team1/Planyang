import Image from 'next/image';
import logoImg from '@/../public/assets/images/logoImg.svg';
import logoTitle from '@/../public/assets/images/logoTitle.svg';
import vector from '@/../public/assets/icons/vector.svg';
import profileEllipse from '@/../public/assets/icons/profileEllipse.svg';
import crown from '@/../public/assets/icons/crown.svg';
import styles from './SideMenu.module.css';

const SideMenu = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logoFrame}>
        <a href="/mydashboard">
          <Image src={logoImg} alt="logoImg" />
          <Image id={styles.logoTitle} src={logoTitle} alt="logoTitle" />
        </a>
      </div>
      <div className={styles.titleWrapper}>
        <span id={styles.title}>Dash Boards</span>
        <Image id={styles.vector} src={vector} alt="vector" />
        {/* onClick 모달창 연결 */}
      </div>

      <div className={styles.listWrapper}>
        {/* 반복문으로 대시보드 띄워주기 */}
        <a className={styles.dashList} href="/">
          <div>
            <Image
              width={8}
              height={8}
              src={profileEllipse}
              alt="profileEllipse"
            />
          </div>
          <span id={styles.dashBoardName}>대시보드1</span>
          <Image
            id={styles.crown}
            width={17.59}
            height={14}
            src={crown}
            alt="crown"
          />
        </a>
        <a className={styles.dashList} href="/">
          <div>
            <Image
              width={8}
              height={8}
              src={profileEllipse}
              alt="profileEllipse"
            />
          </div>
          <span id={styles.dashBoardName}>대시보드2</span>
          <Image
            id={styles.crown}
            width={17.59}
            height={14}
            src={crown}
            alt="crown"
          />
        </a>
        <a className={styles.dashList} href="/">
          <div>
            <Image
              width={8}
              height={8}
              src={profileEllipse}
              alt="profileEllipse"
            />
          </div>
          <span id={styles.dashBoardName}>대시보드3</span>
          <Image
            id={styles.crown}
            width={17.59}
            height={14}
            src={crown}
            alt="crown"
          />
        </a>
      </div>
    </div>
  );
};

export default SideMenu;
