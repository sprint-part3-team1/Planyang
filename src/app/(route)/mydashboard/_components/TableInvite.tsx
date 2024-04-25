import React, { useState, useEffect } from 'react';
import CancelButton from '@/app/_components/Button/CancelButton/CancelButton';
import InviteButton from '@/app/_components/Button/InviteButton/InviteButton';
import {
  invitationData,
  invitationActions,
} from '@/app/_slice/invitationSlice';
import useAppDispatch from '@/app/_hooks/useAppDispatch';
import useAppSelector from '@/app/_hooks/useAppSelector';
import { dashBoardDetailData } from '@/app/_slice/dashBoardDetail';
import ArrowButton from '@/app/_components/Button/ArrowButton/ArrowButton';
import styles from '@/app/(route)/mydashboard/_components/TableInvite.module.css';

const TableInvite = () => {
  const dispatch = useAppDispatch();
  const dashBoardDatas = useAppSelector(dashBoardDetailData);
  const invitationDatas = useAppSelector(invitationData);

  const getMyInvitationList = (
    dashBoardId: number | undefined,
    page: number,
  ) => {
    dispatch(invitationActions.asynchGetMyInvitation({ dashBoardId, page }));
  };

  const cancelInvitation = (dashBoardId: number, invitationId: number) => {
    dispatch(
      invitationActions.asynchFetchDeleteInvited({
        dashBoardId,
        invitationId,
      }),
    );
  };

  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (dashBoardDatas?.id) {
      getMyInvitationList(dashBoardDatas.id, currentPage);
    }
  }, [dashBoardDatas, dispatch, currentPage]);

  const handleClickCancel = async (
    dashBoardId: number,
    invitationId: number,
  ) => {
    await cancelInvitation(dashBoardId, invitationId);
    if (invitationDatas.data?.invitations.length === 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const onLeftButtonClick = async () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  const onRightButtonClick = async () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span id={styles.titleInvite}>초대 내역</span>
        <div className={styles.pagination}>
          <span>1 페이지 중 {currentPage}</span>{' '}
          {/* 수정: currentPage로 변경 */}
          <ArrowButton
            onRightButtonClick={onRightButtonClick}
            onLeftButtonClick={onLeftButtonClick}
          />
          {isMobile ? null : <InviteButton />}
        </div>
      </div>
      <div className={styles.email}>
        <span>이메일</span>
        {isMobile ? <InviteButton /> : null}
      </div>

      {invitationDatas?.data?.invitations.map((item) => (
        <div key={item.id} className={styles.emailContainer}>
          <span id={styles.emailName}>{item.inviter.email}</span>
          <CancelButton
            boardId={dashBoardDatas?.id}
            invitationId={item.id}
            onClick={handleClickCancel}
          />
        </div>
      ))}
    </div>
  );
};

export default TableInvite;
