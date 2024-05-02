import Link from 'next/link';
import styles from './AccessError.module.css';

const AccessError = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>로그인이 필요합니다</h1>

      <div className={styles['button-container']}>
        <Link href="/">
          <button className={styles.button}>메인 페이지로 가기</button>
        </Link>
        <Link href="/login">
          <button className={styles.button}>로그인 하러가기</button>
        </Link>
      </div>
    </div>
  );
};

export default AccessError;
