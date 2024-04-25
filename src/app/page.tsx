'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/app/_components/Header';
import mainLandingCard from '@/../public/assets/images/landingMainCard.png';
import Image from 'next/image';
import styles from './page.module.css';
import PointCards from './(route)/(Home)/_components/PointCards';
import OptionCards from './(route)/(Home)/_components/OptionCards';
import Footer from './(route)/(Home)/_components/Footer';
import { dashBoardActions, dashBoardData } from './_slice/dashBoardSlice';
import useAppDispatch from './_hooks/useAppDispatch';
import useAppSelector from './_hooks/useAppSelector';

const Home = () => {
  const dispatch = useAppDispatch();
  const dashBoardDatas = useAppSelector(dashBoardData);
  const router = useRouter();

  const getMyDashBoard = () => {
    dispatch(dashBoardActions.asynchFetchGetDashBoard(1));
  };

  useEffect(() => {
    // getMyDashBoard();
  }, []);

  useEffect(() => {
    console.log(dashBoardDatas);
    // if (dashBoardDatas) {
    //   router.push(`./dashboard/${dashBoardDatas.dashboards[0].id}`);
    // }
  }, [dashBoardDatas]);

  return (
    <div className={styles.container}>
      <Header isWhite={false} />
      <div className={styles.mainCardDiv}>
        <Image fill src={mainLandingCard} alt="랜딩페이지 메인카드" />
      </div>

      <div className={styles.headlineDiv}>
        <span id={styles.first}>새로운 일정 관리</span>
        <span id={styles.second}>Taskify</span>
      </div>
      <p id={styles.explanation}>서비스의 메인 설명 들어갑니다.</p>
      <button type="button" className={styles.loginButton}>
        로그인 하기
      </button>
      <PointCards />
      <OptionCards />
      <Footer />
    </div>
  );
};

export default Home;
