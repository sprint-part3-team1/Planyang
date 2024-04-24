'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import useAppDispatch from '@/app/_hooks/useAppDispatch';
import useAppSelector from '@/app/_hooks/useAppSelector';
import { DashBoardInformationType } from '@/app/_slice/dashBoardSlice';
import {
  receivedInvitationActions,
  receivedInvitationData,
} from '@/app/_slice/receivedInvitationsSlice';
import { dashBoardDetailActions } from '@/app/_slice/dashBoardDetail';
import DashboardListNavBar from '@/app/_components/_navbar/_dashboardNavbar/_dashboardListType/DashboardListNavBar';
import AddDashBoardButton from '@/app/_components/Button/AddDashBoardButton/AddDashBoardButton';
import DashBoardButton from '@/app/_components/Button/DashBoardButton/DashBoardButton';
import ArrowButton from '@/app/_components/Button/ArrowButton/ArrowButton';
import MODAL_TYPES from '@/app/constants/modalTypes';
import ModalPortal from '@/app/_components/modal/modalPortal/ModalPortal';
import fetchDashboards from './_api/dashboardPagination';
import styles from './page.module.css';
import DashInvite from './_components/DashInvite';

interface DashBoardStateType {
  data: {
    dashboards: DashBoardInformationType[];
    totalCount: number;
    cursorId: number | null;
  } | null;
}

export default function MyDashBoard() {
  const dispatch = useAppDispatch();
  const receivedInvitationDatas = useAppSelector(receivedInvitationData);

  const [openModalType, setOpenModalType] = useState('');

  const [page, setPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLeftActive, setIsLeftActive] = useState<boolean>(false);
  const [isRightActive, setIsRightActive] = useState<boolean>(false);
  const [dashBoardDatas, setDashBoardDatas] =
    useState<null | DashBoardStateType>(null);

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

  // 초대받은 대시보드와 계정정보
  useEffect(() => {
    dispatch(receivedInvitationActions.asyncGetReceivedInvitations());
  }, [dispatch]);

  // 대시보드 버튼의 페이지 네이션
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDashboards(page);
        setDashBoardDatas(data);
      } catch (error) {
        console.error('Error fetching dashboards:', error);
      }
    };

    fetchData();
  }, [page, dispatch]);

  // 전체 대시보드 수와 전체 페이지 지정
  useEffect(() => {
    if (dashBoardDatas) {
      setTotalCount(dashBoardDatas?.totalCount);
      console.log(dashBoardDatas);
      console.log(totalCount);
      setTotalPages(Math.ceil(totalCount / 5));
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
    <div style={{ width: '100%' }}>
      <DashboardListNavBar />
      <div className={styles.content}>
        <div className={styles.dashBoardButtons}>
          <ModalPortal
            openModalType={openModalType}
            setOpenModalType={setOpenModalType}
          />
          <div onClick={() => setOpenModalType(MODAL_TYPES.newDashboard)}>
            <AddDashBoardButton />
          </div>
          {dashBoardDatas?.dashboards?.map((dashBoard, index) => {
            return (
              <Link
                key={index}
                href={`/dashboard/${dashBoard.id}`}
                onClick={() => {
                  dispatch(
                    dashBoardDetailActions.asyncFetchGetDashBoardDetail({
                      dashBoardId: dashBoard.id,
                    }),
                  );
                }}
              >
                <DashBoardButton
                  color={dashBoard.color}
                  createdByMe={dashBoard.createdByMe}
                  title={dashBoard.title}
                />
              </Link>
            );
          })}
        </div>
        <div className={styles.paginationFrame}>
          <span>
            {totalPages} 페이지 중 {page} 페이지
          </span>
          <ArrowButton
            isLeftActive={isLeftActive}
            isRightActive={isRightActive}
            onLeftButtonClick={handleLeftButtonClick}
            onRightButtonClick={handleRightButtonClick}
          />
        </div>
        <DashInvite inviteData={receivedInvitationDatas?.invitations} />
      </div>
    </div>
  );
}
