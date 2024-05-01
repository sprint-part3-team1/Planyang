'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import useAppDispatch from '@/app/_hooks/useAppDispatch';
import {
  receivedInvitationActions,
  receivedInvitationData,
} from '@/app/_slice/receivedInvitationsSlice';
import Image from 'next/image';
import AcceptButton from '@/app/_components/Button/AcceptButton/AcceptButton';
import RejectButton from '@/app/_components/Button/RejectButton/RejectButton';
import useAppSelector from '@/app/_hooks/useAppSelector';
import { dashBoardActions, dashBoardData } from '@/app/_slice/dashBoardSlice';
import styles from './DashInvite.module.css';

const DashInvite = ({ setPageOne }) => {
  const SEARCH_ICON = '/assets/icons/search.svg';
  const UNSUBSCRIBE_IMAGE = '/assets/images/unsubscribe.svg';

  const [isMobile, setIsMobile] = useState(false);

  const [cursorId, setCursorId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inviteInformation = useAppSelector(receivedInvitationData);
  const dispatch = useAppDispatch();

  const [cursor, setCursor] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState<string | null>('');
  const { ref, inView } = useInView({
    threshold: 0.5,
  });
  const [isFirstGetInvite, setIsFirstGetInvite] = useState(false);
  const getInvitation = async (searchQuery: string | null) => {
    try {
      await dispatch(
        receivedInvitationActions.asyncGetReceivedInvitations(searchQuery),
      );
      // 초대 정보를 받은 후에 새로운 cursorId를 가져와서 설정합니다.
      const newCursorId = inviteInformation?.cursorId;
      if (newCursorId !== undefined && newCursorId !== cursorId) {
        setCursorId(newCursorId);
      }
    } catch (error) {
      console.error('Error fetching invites:', error);
    }
  };

  const getInvitationByCursor = async (cursorId: number) => {
    dispatch(
      receivedInvitationActions.asyncGetReceivedInvitationsByCursorId(cursorId),
    );
  };

  useEffect(() => {
    try {
      getInvitation('');
      setIsFirstGetInvite(true);
    } catch (error) {
      console.error('Error fetching invites:', error);
    }
  }, []);

  useEffect(() => {
    if (inviteInformation) {
      setCursor(inviteInformation.cursorId);
    }
  }, [inviteInformation?.cursorId, dispatch]);

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

  const acceptInvite = (invitationId: number) => {
    dispatch(
      receivedInvitationActions.asyncAcceptInvite({
        invitationId,
        isAccept: true,
      }),
    );

    dispatch(dashBoardActions.asynchFetchGetDashBoard(1));
  };

  const rejectInvite = (invitationId: number) => {
    dispatch(
      receivedInvitationActions.asyncAcceptInvite({
        invitationId,
        isAccept: false,
      }),
    );
  };

  // observe
  useEffect(() => {
    if (inView && isFirstGetInvite && inviteInformation?.cursorId) {
      getInvitationByCursor(inviteInformation?.cursorId);
    }
  }, [inView]);

  const onChangeInput = async (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (isFirstGetInvite) {
      if (inputValue === '') {
        getInvitation('');
      } else {
        getInvitation(`&title=${inputValue}`);
      }
    }
  }, [inputValue]);

  return (
    <div
      className={
        inviteInformation?.invitations &&
        inviteInformation?.invitations.length === 0
          ? styles.noContainer
          : styles.container
      }
    >
      <span className={styles.title}>초대받은 대시보드</span>
      <div className={styles.searchBar}>
        <div className={styles.searchBarContent}>
          <Image
            id={styles.searchIcon}
            width={24}
            height={24}
            src={SEARCH_ICON}
            alt="searchIcon"
          />
          <input
            id={styles.input}
            placeholder="검색"
            value={inputValue}
            onChange={onChangeInput}
          />
        </div>
      </div>
      {inviteInformation?.invitations &&
      inviteInformation?.invitations.length === 0 ? (
        <div className={styles.messageFrame}>
          <Image
            id={styles.unsubscribeImage}
            width={100}
            height={100}
            src={UNSUBSCRIBE_IMAGE}
            alt="unsubscribeImage"
          />
          <span id={styles.message}>초대받은 대시보드가 없습니다.</span>
        </div>
      ) : (
        <>
          {' '}
          {isMobile ? (
            <>
              {' '}
              {inviteInformation?.invitations &&
                inviteInformation?.invitations.map((invite, index) => (
                  <div key={index} className={styles.dashContainer}>
                    <div className={styles.dashContent}>
                      <span id={styles.name}>이름</span>
                      <span id={styles.dashName}>{invite.dashboard.title}</span>
                      <span id={styles.invite}>초대자</span>
                      <span id={styles.dashInvite}>
                        {invite.inviter.nickname}
                      </span>
                    </div>
                    <div className={styles.buttonContainer}>
                      <AcceptButton onClick={() => acceptInvite(invite.id)} />
                      <RejectButton onClick={() => rejectInvite(invite.id)} />
                    </div>
                  </div>
                ))}
            </>
          ) : (
            <>
              {' '}
              <div className={styles.contentTitle}>
                <span id={styles.name}>이름</span>
                <span id={styles.invite}>초대자</span>
                <span id={styles.agree}>수락여부</span>
              </div>
              {inviteInformation?.invitations &&
                inviteInformation?.invitations.map((invite, index) => (
                  <div key={index} className={styles.dashContainer}>
                    <span id={styles.dashName}>{invite.dashboard.title}</span>
                    <span id={styles.dashInvite}>
                      {invite.inviter.nickname}
                    </span>
                    <div className={styles.buttonContainer}>
                      <AcceptButton onClick={() => acceptInvite(invite.id)} />
                      <RejectButton onClick={() => rejectInvite(invite.id)} />
                    </div>
                  </div>
                ))}
            </>
          )}
        </>
      )}{' '}
      <div
        ref={ref}
        style={{
          width: '10px',
          height: '10px',
        }}
      />
    </div>
  );
};

export default DashInvite;
