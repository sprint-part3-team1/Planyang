'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/app/_components/Header';
import mainLandingCard from '@/../public/assets/images/landingMainCard.png';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import PointCards from './(route)/(Home)/_components/PointCards';
import OptionCards from './(route)/(Home)/_components/OptionCards';
import Footer from './(route)/(Home)/_components/Footer';
import { dashBoardActions, dashBoardData } from './_slice/dashBoardSlice';
import useAppDispatch from './_hooks/useAppDispatch';
import useAppSelector from './_hooks/useAppSelector';
import { registerActions, userResponse } from './_slice/registerSlice';

const Home = () => {
  const dispatch = useAppDispatch();
  const dashBoardDatas = useAppSelector(dashBoardData);
  const router = useRouter();
  const userData = useAppSelector(userResponse);
  const getMyDashBoard = () => {
    dispatch(dashBoardActions.asynchFetchGetDashBoard(1));
  };

  useEffect(() => {
    // getMyDashBoard();
  }, []);

  useEffect(() => {
    dispatch(registerActions.asynchFetchgetUserInfo());
  }, []);

  useEffect(() => {
    if (userData.data !== null) {
      router.push('/mydashboard');
    }
  }, [userData]);

  return (
    <div className={styles.container}>
      <Header isWhite={false} />
      <div className={styles.mainCardDiv}>
        <Image
          fill
          src="/assets/images/landingImage.PNG"
          alt="랜딩페이지 메인카드"
        />
      </div>

      <div className={styles.headlineDiv}>
        <span id={styles.first}>새로운 일정 관리</span>
        <span id={styles.second}>Planyang</span>
      </div>
      <p id={styles.explanation}>서비스의 메인 설명 들어갑니다.</p>
      <Link href="/login">
        <button type="button" className={styles.loginButton}>
          로그인 하기
        </button>
      </Link>
      <PointCards />
      <OptionCards />
      <Footer />
    </div>
  );
};

export default Home;
