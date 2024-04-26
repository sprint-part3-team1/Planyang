import Image from 'next/image';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import MODAL_TYPES from '@/app/constants/modalTypes';
import ModalPortal from '@/app/_components/modal/modalPortal/ModalPortal';
import ArrowButton from '@/app/_components/Button/ArrowButton/ArrowButton';
import styles from './SideMenu.module.css';
import DashBoardColorCircle from './DashBoardColorCircle';
import fetchDashboards from '../_api/dashboardPagination';

const SideMenu = () => {
  const [openModalType, setOpenModalType] = useState('');
  const [selectedDashboardId, setSelectedDashboardId] = useState<number | null>(
    null,
  );
  const [page, setPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLeftActive, setIsLeftActive] = useState<boolean>(false);
  const [isRightActive, setIsRightActive] = useState<boolean>(false);
  const [dashBoardDatas, setDashBoardDatas] =
    useState<null | DashBoardStateType>(null);

  const LOGO_IMAGE = '/assets/images/logoImg.svg';
  const LOGO_TITLE = '/assets/images/logoTitle.svg';
  const VECTOR_ICON_SRC = '/assets/icons/vector.svg';
  const CROWN_ICON_SRC = '/assets/icons/crown.svg';

  const handleDashboardItemClick = (id: number) => {
    setSelectedDashboardId(id);
  };

  const handleLeftButtonClick = () => {
    // 좌측 버튼을 클릭했을 때의 동작 구현
    if (isLeftActive) {
      console.log('페이지 -1');
      setPage(page - 1);
    }
  };

  const handleRightButtonClick = () => {
    // 우측 버튼을 클릭했을 때의 동작 구현
    if (isRightActive) {
      console.log('페이지 +1');
      setPage(page + 1);
    }
  };

  // 대시보드 버튼의 페이지 네이션
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDashboards(page, 8);
        setDashBoardDatas(data);
      } catch (error) {
        console.error('Error fetching dashboards:', error);
      }
    };

    fetchData();
  }, [page]);

  // 전체 대시보드 수와 전체 페이지 지정
  useEffect(() => {
    if (dashBoardDatas) {
      setTotalCount(dashBoardDatas?.totalCount);
      console.log(dashBoardDatas);
      console.log(totalCount);
      setTotalPages(Math.ceil(totalCount / 8));
    }
  }, [dashBoardDatas, totalCount]);

  // 화살표 버튼 활성화 기능
  useEffect(() => {
    if (page === 1 && totalPages === 1) {
      setIsLeftActive(false);
      setIsRightActive(false);
    } else if (page === 1 && totalPages > page) {
      setIsLeftActive(false);
      setIsRightActive(true);
    } else if (page > 1 && page < totalPages) {
      setIsLeftActive(true);
      setIsRightActive(true);
    } else if (page === totalPages) {
      setIsLeftActive(true);
      setIsRightActive(false);
    }
  }, [page, totalPages]);

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
          onClick={() => {
            setOpenModalType(MODAL_TYPES.newDashboard);
          }}
        />
      </div>

      <div className={styles.listWrapper}>
        {dashBoardDatas?.dashboards.map((item) => {
          return (
            <Link
              className={`${styles.dashList} ${selectedDashboardId === item.id ? styles.selected : ''}`}
              href={`/dashboard/${item.id}`}
              key={item.id}
              onClick={() => {
                handleDashboardItemClick(item.id);
              }}
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
            onLeftButtonClick={handleLeftButtonClick}
            onRightButtonClick={handleRightButtonClick}
          />
          {/* <span id={styles.pageFont}>
            {page} Page / {totalPages} Pages
          </span> */}
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
