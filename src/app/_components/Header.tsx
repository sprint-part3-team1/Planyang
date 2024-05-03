import Link from 'next/link';
import styles from '@/app/_components/Header.module.css';
import { useRouter } from 'next/navigation';
import { HeaderProps } from '../_types/HeaderProps';

const Header = ({ isWhite }: HeaderProps) => {
  const LOGO_IMG = '/assets/images/planyang_image.png';
  const LOGO_TITLE = '/assets/images/planyang_text.PNG';
  const router = useRouter();
  return (
    <div
      className={`${styles.headerWrapper} ${isWhite ? styles.backWhite : ''}`}
    >
      <div className={styles.headerContainer}>
        <Link href="/" className={styles.logoBox}>
          <img src={LOGO_IMG} alt="logoImage" height={33} />
          <img
            className={styles.logoTitle}
            src={LOGO_TITLE}
            alt="logoTitle"
            height={29}
          />
        </Link>
        <div className={`${styles.signBox} ${isWhite ? styles.backWhite : ''}`}>
          <Link
            href="/login"
            onClick={() => {
              router.push('/login');
            }}
          >
            로그인
          </Link>

          <Link href="/signup">회원가입</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
