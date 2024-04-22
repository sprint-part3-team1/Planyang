'use client';

import Image from 'next/image';
import { dashBoardActions, dashBoardData } from '@/app/_slice/dashBoardSlice';
import useAppSelector from '@/app/_hooks/useAppSelector';
import useAppDispatch from '@/app/_hooks/useAppDispatch';
import { useEffect } from 'react';
import styles from './SideMenu.module.css';

const SideMenu = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(dashBoardActions.asynchFetchGetDashBoard());
  }, []);
  const dashBoardDatas = useAppSelector(dashBoardData);
  console.log(dashBoardDatas);
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
        {dashBoardDatas?.dashboards.map((item) => {
          return (
            <a
              className={styles.dashList}
              href={`/dashboard/${item.id}`}
              key={item.id}
            >
              <div>
                <Image
                  width={8}
                  height={8}
                  src={PROFILE_ELLIPSE_ICON_SRC}
                  alt="profileEllipse"
                />
              </div>
              <span id={styles.dashBoardName}>{item.title}</span>
              <Image
                id={styles.crown}
                width={17.59}
                height={14}
                src={CROWN_ICON_SRC}
                alt="crown"
              />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default SideMenu;
