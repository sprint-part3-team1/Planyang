import Link from 'next/link';
import styles from './style/page.module.css';

const Logout = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>로그아웃 되었습니다</h1>

      <div className={styles['button-container']}>
        <Link href="/">
          <button className={styles.button}>메인 페이지로 가기</button>
        </Link>
        <Link href="/login">
          <button className={styles.button}>다시 로그인하기</button>
        </Link>
      </div>
    </div>
  );
};

export default Logout;
