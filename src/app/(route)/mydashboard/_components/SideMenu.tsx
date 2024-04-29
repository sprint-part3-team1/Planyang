'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import MODAL_TYPES from '@/app/constants/modalTypes';
import ModalPortal from '@/app/_components/modal/modalPortal/ModalPortal';
import ArrowButton from '@/app/_components/Button/ArrowButton/ArrowButton';

import useAppSelector from '@/app/_hooks/useAppSelector';
import { dashBoardActions, dashBoardData } from '@/app/_slice/dashBoardSlice';
import useAppDispatch from '@/app/_hooks/useAppDispatch';
import styles from './SideMenu.module.css';
import DashBoardColorCircle from './DashBoardColorCircle';

const SideMenu = () => {
  const [openModalType, setOpenModalType] = useState('');
  const dispatch = useAppDispatch();
  const LOGO_IMAGE = '/assets/images/planyang_image.png';
  const LOGO_TITLE = '/assets/images/planyang_text.PNG';
  const VECTOR_ICON_SRC = '/assets/icons/vector.svg';
  const CROWN_ICON_SRC = '/assets/icons/crown.svg';

  const dashboardDatas = useAppSelector(dashBoardData);
  const getDashboardData = (page: number) => {
    dispatch(dashBoardActions.asynchFetchGetDashBoard(page));
  };

  const [page, setPage] = useState(1);
  const [isLeftActive, setIsLeftActive] = useState(false);
  const [isRightActive, setIsRightActive] = useState(false);

  useEffect(() => {
    getDashboardData(page);
  }, [page, dispatch]);

  const onRightButtonClick = () => {
    if (page * 7 < dashboardDatas?.totalCount) {
      setPage((prev) => prev + 1);
      setIsRightActive(true);
    }
  };

  const onLeftButtonClick = () => {
    if (page !== 1) {
      setPage((prev) => prev - 1);
      setIsLeftActive(true);
    }
  };

  console.log(dashboardDatas);
  return (
    <div className={styles.container}>
      <div className={styles.logoFrame}>
        <a href="/mydashboard">
          <img height={33} src={LOGO_IMAGE} alt="logoImg" />
          <img
            height={29}
            id={styles.logoTitle}
            src={LOGO_TITLE}
            alt="logoTitle"
          />
        </a>
      </div>
      <div className={styles.titleWrapper}>
        <span id={styles.title}>Dash Boards</span>
        <ModalPortal
          openModalType={openModalType}
          setOpenModalType={setOpenModalType}
        />
        <Image
          width={20}
          height={20}
          id={styles.vector}
          src={VECTOR_ICON_SRC}
          alt="vector"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setOpenModalType(MODAL_TYPES.newDashboard);
          }}
        />
      </div>

      <div className={styles.listWrapper}>
        {dashboardDatas?.dashboards.map((item) => {
          return (
            // ${selectedDashboardId === item.id ? styles.selected : ''}
            <Link
              className={`${styles.dashList} `}
              href={`/dashboard/${item.id}`}
              key={item.createAt}
            >
              <div>
                <DashBoardColorCircle color={item.color} />
              </div>
              <span id={styles.dashBoardName}>{item.title}</span>
              {item.createdByMe && (
                <Image
                  id={styles.crown}
                  width={17.59}
                  height={14}
                  src={CROWN_ICON_SRC}
                  alt="crown"
                />
              )}
            </Link>
          );
        })}
      </div>
      <div>
        <div className={styles.paginationFrame}>
          <ArrowButton
            isLeftActive={isLeftActive}
            isRightActive={isRightActive}
            onLeftButtonClick={onLeftButtonClick}
            onRightButtonClick={onRightButtonClick}
          />
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
