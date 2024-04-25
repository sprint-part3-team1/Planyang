'use client';

import React, { useState, useEffect, useRef } from 'react';
import useAppDispatch from '@/app/_hooks/useAppDispatch';
import { receivedInvitationActions } from '@/app/_slice/receivedInvitationsSlice';
import Image from 'next/image';
import AcceptButton from '@/app/_components/Button/AcceptButton/AcceptButton';
import RejectButton from '@/app/_components/Button/RejectButton/RejectButton';
import styles from './DashInvite.module.css';
import { fetchInviteData, fetchInviteDataCursor } from '../_api/inviteScroll';

const DashInvite = () => {
  const SEARCH_ICON = '/assets/icons/search.svg';
  const UNSUBSCRIBE_IMAGE = '/assets/images/unsubscribe.svg';

  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [inviteDatas, setInviteDatas] = useState(null); // 초대받은 목록에 관한 데이터
  const [cursorId, setCursorId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  // 대시보드 버튼의 페이지 네이션
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchInviteData();
        setInviteDatas(data.invitations);
        setCursorId(data.cursorId);
      } catch (error) {
        console.error('Error fetching invites:', error);
      }
    };

    fetchData();
  }, []);

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

  // 초대를 수락합니다 해당 초대목록이 state에서 삭제 됩니다
  const acceptInvite = (invitationId: number) => {
    dispatch(
      receivedInvitationActions.asyncAcceptInvite({
        invitationId,
        isAccept: true,
      }),
    );
  };

  // 초대를 거절합니다 해당 초대목록이 state에서 삭제 됩니다
  const rejectInvite = (invitationId: number) => {
    dispatch(
      receivedInvitationActions.asyncAcceptInvite({
        invitationId,
        isAccept: false,
      }),
    );
  };

  // 검색어를 기준으로 필터링을 합니다. 대소문자 상관없음.
  const filteredInviteData = inviteDatas
    ? inviteDatas.filter((invite) =>
        invite.dashboard.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase()),
      )
    : [];

  useEffect(() => {
    // 스크롤 함수
    const handleScroll = async () => {
      const container = containerRef.current;
      if (container) {
        const { scrollTop, clientHeight, scrollHeight } = container;
        if (scrollHeight - scrollTop === clientHeight) {
          if (cursorId !== null) {
            try {
              const data = await fetchInviteDataCursor(cursorId);
              setInviteDatas((prevData) => {
                if (prevData) {
                  return [...prevData, ...data.invitations];
                }
                return data.invitations;
              });
              // setInviteDatas(data.invitations);
              setCursorId(data.cursorId);
            } catch (error) {
              console.error('Error fetching invites:', error);
            }
          }
        }
      }
    };
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [cursorId, containerRef, inviteDatas]);

  return (
    <div
      ref={containerRef}
      className={
        inviteDatas && inviteDatas.length === 0
          ? styles.noContainer
          : styles.container
      }
    >
      <span className={styles.title}>초대받은 대시보드</span>
      <div
        className={
          inviteDatas && inviteDatas.length === 0
            ? styles.noSearchBar
            : styles.searchBar
        }
      >
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      {inviteDatas && inviteDatas.length === 0 ? (
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
              {filteredInviteData &&
                filteredInviteData.map((invite, index) => (
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
              {filteredInviteData &&
                filteredInviteData.map((invite, index) => (
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
      )}
    </div>
  );
};

export default DashInvite;
