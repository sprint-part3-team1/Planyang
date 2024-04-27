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

  const [isMobile, setIsMobile] = useState(false);

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
      getMyInvitationList(dashBoardDatas.id, invitationDatas.page);
    }
  }, [dashBoardDatas, dispatch, invitationDatas.page]);

  const onRightButtonClick = async () => {
    if (invitationDatas.page * 5 < invitationDatas.data?.totalCount)
      dispatch(invitationActions.incrementPage());
  };

  const onLeftButtonClick = async () => {
    if (invitationDatas.page !== 1) {
      dispatch(invitationActions.decreasePage());
    }
  };

  const handleDeleteAndNavigate = async (
    dashBoardId: number,
    invitationId: number,
  ) => {
    await dispatch(
      invitationActions.asynchFetchDeleteInvited({ dashBoardId, invitationId }),
    );
    await dispatch(
      invitationActions.asynchGetMyInvitation({
        dashBoardId,
        page: invitationDatas.page,
      }),
    );

    if (invitationDatas.data?.invitations.length === 1) {
      dispatch(invitationActions.setMaxPage());
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span id={styles.titleInvite}>초대 내역</span>
        <div className={styles.pagination}>
          <span>1 페이지 중 {invitationDatas.page}</span>{' '}
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
          <span id={styles.emailName}>{item.invitee.email}</span>
          <CancelButton
            boardId={dashBoardDatas?.id}
            invitationId={item.id}
            handleDeleteAndNavigate={handleDeleteAndNavigate}
          />
        </div>
      ))}
    </div>
  );
};

export default TableInvite;
