import Image from 'next/image';
import Link from 'next/link';
import styles from '@/app/_components/Header.module.css';
import { HeaderProps } from '../_types/HeaderProps';

const Header = ({ isWhite }: HeaderProps) => {
  const LOGO_IMG = '/assets/images/logoImg.svg';
  const LOGO_TITLE = '/assets/images/logoTitle.svg';
  const LOGO_IMG_WHITE = '/assets/images/logoImgWhite.svg';
  const LOGO_TITLE_WHITE = '/assets/images/logoTitleWhite.svg';

  return (
    <div
      className={`${styles.headerWrapper} ${isWhite ? styles.backWhite : ''}`}
    >
      <div className={styles.headerContainer}>
        <Link href="/" className={styles.logoBox}>
          <Image
            src={isWhite ? LOGO_IMG : LOGO_IMG_WHITE}
            alt="logoImage"
            width={28}
            height={33}
          />
          <Image
            className={styles.logoTitle}
            src={isWhite ? LOGO_TITLE : LOGO_TITLE_WHITE}
            alt="logoTitle"
            width={80}
            height={22}
          />
        </Link>
        <div className={`${styles.signBox} ${isWhite ? styles.backWhite : ''}`}>
          <Link href="/">로그인</Link>
          <Link href="/">회원가입</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
