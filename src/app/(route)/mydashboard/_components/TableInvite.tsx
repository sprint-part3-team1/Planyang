'use client';

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

import ArrowButton from '../../../_components/Button/ArrowButton/ArrowButton';
import styles from './TableInvite.module.css';

const TableInvite = () => {
  const dispatch = useAppDispatch();
  const dashBoardDatas = useAppSelector(dashBoardDetailData);
  const invitationDatas = useAppSelector(invitationData);
  console.log(dashBoardDatas?.id);

  const getMyInvitationList = (dashBoardId: number | undefined) => {
    dispatch(invitationActions.asynchGetMyInvitation(dashBoardId));
  };

  const cancleInvitation = (dashBoardId: number, invitationId: number) => {
    dispatch(
      invitationActions.asynchFetchDeleteInvited({
        dashBoardId,
        invitationId,
      }),
    );
  };
  // console.log('초오옹대목록');
  // console.log(invitationDatas);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // 초기 렌더링 시 한 번 호출하여 초기 상태 설정

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (dashBoardDatas?.id) {
      getMyInvitationList(dashBoardDatas.id);
    }
  }, [dashBoardDatas]);

  const handleClickCancel = (dashBoardId: number, invitationId: number) => {
    cancleInvitation(dashBoardId, invitationId);
  };
 

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span id={styles.titleInvite}>초대 내역</span>
        <div className={styles.pagination}>
          <span>1 페이지 중 1</span>
          <ArrowButton />
          {isMobile ? null : <InviteButton />}
        </div>
      </div>
      <div className={styles.email}>
        <span>이메일</span>
        {isMobile ? <InviteButton /> : null}
      </div>

      {invitationDatas?.invitations.map((item) => {
        return (
          <div key={item.id} className={styles.emailContainer}>
            <span id={styles.emailName}>{item.inviter.email}</span>
            <CancelButton
              boardId={dashBoardDatas?.id}
              invitationId={item.id}
              onClick={handleClickCancel}
            />
          </div>
        );
      })}
    </div>
  );
};

export default TableInvite;
