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
import styles from './DashInvite.module.css';
import { fetchInviteData, fetchInviteDataCursor } from '../_api/inviteScroll';

const DashInvite = ({ setPageOne }) => {
  const SEARCH_ICON = '/assets/icons/search.svg';
  const UNSUBSCRIBE_IMAGE = '/assets/images/unsubscribe.svg';

  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [inviteDatas, setInviteDatas] = useState(null);
  const [needRender, setNeedRender] = useState(false);
  const [cursorId, setCursorId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inviteInformation = useAppSelector(receivedInvitationData);
  const dispatch = useAppDispatch();

  const [cursor, setCursor] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 1,
  });

  const getInvitation = async () => {
    try {
      await dispatch(receivedInvitationActions.asyncGetReceivedInvitations());
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

  console.log(inviteInformation?.invitations);
  useEffect(() => {
    try {
      getInvitation();
    } catch (error) {
      console.error('Error fetching invites:', error);
    }
  }, []);

  useEffect(() => {
    if (inviteInformation) {
      setCursor(inviteInformation.cursorId);
    }
  }, [inviteInformation?.cursorId, dispatch]);

  const fetchData = async () => {
    try {
      const data = await fetchInviteData();
      setInviteDatas(data.invitations);
      setCursorId(data.cursorId);
      setNeedRender(true);
    } catch (error) {
      console.error('Error fetching invites:', error);
    }
  };

  // const testButtonClickHandler = () => {
  //   if (isVisible) {
  //     // isVisible 상태가 true 일 때만 실행
  //     if (inviteInformation) {
  //       getInvitationByCursor(inviteInformation.cursorId);
  //     }
  //   }
  // };

  useEffect(() => {
    fetchData();
  }, []);

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
    setInviteDatas((prevData) =>
      prevData.filter((invite) => invite.id !== invitationId),
    );
    if (needRender === true) {
      setTimeout(() => {
        console.log('재랜더링');
        fetchData();
      }, 100);
    }
    setPageOne();
  };

  const rejectInvite = (invitationId: number) => {
    dispatch(
      receivedInvitationActions.asyncAcceptInvite({
        invitationId,
        isAccept: false,
      }),
    );
    setInviteDatas((prevData) =>
      prevData.filter((invite) => invite.id !== invitationId),
    );
    if (needRender === true) {
      setTimeout(() => {
        console.log('재랜더링');
        fetchData();
      }, 100);
    }
  };

  const filteredInviteData = inviteDatas
    ? inviteDatas.filter((invite) =>
        invite.dashboard.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase()),
      )
    : [];

  useEffect(() => {
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
              setCursorId(data.cursorId);
              if (needRender === true) {
                setNeedRender(false);
              }
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

  const chkData = () => {
    console.log(inviteDatas);
  };

  // observe
  useEffect(() => {
    if (inView) {
      console.log('보임');
      getInvitationByCursor(inviteInformation?.cursorId);
    }
  }, [inView]);
  return (
    <div ref={containerRef} className={styles.container}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '100px' }}>
        {inviteInformation?.invitations.map((item) => {
          return (
            <div key={item.id} style={{ display: 'flex', gap: '120px' }}>
              <div style={{ fontSize: '30px' }}>{item.dashboard.title}</div>
              <div style={{ fontSize: '30px' }}>{item.invitee.nickname}</div>

              <AcceptButton />
              <RejectButton />
            </div>
          );
        })}
      </div>
      <div
        ref={ref}
        style={{
          width: '10px',
          height: '10px',
          background: 'lightblue',
        }}
      >
        박스
      </div>
    </div>
  );
};

export default DashInvite;

// <div
//   ref={containerRef}
//   className={
//     inviteDatas && inviteDatas.length === 0
//       ? styles.noContainer
//       : styles.container
//   }
// >
//   <button
//     type="button"
//     onClick={() => {
//       chkData();
//     }}
//   >
//     확인
//   </button>
//   <span className={styles.title}>초대받은 대시보드</span>
//   <div
//     className={
//       inviteDatas && inviteDatas.length === 0
//         ? styles.noSearchBar
//         : styles.searchBar
//     }
//   >
//     <div className={styles.searchBarContent}>
//       <Image
//         id={styles.searchIcon}
//         width={24}
//         height={24}
//         src={SEARCH_ICON}
//         alt="searchIcon"
//       />
//       <input
//         id={styles.input}
//         placeholder="검색"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//       />
//     </div>
//   </div>
//   {inviteDatas && inviteDatas.length === 0 ? (
//     <div className={styles.messageFrame}>
//       <Image
//         id={styles.unsubscribeImage}
//         width={100}
//         height={100}
//         src={UNSUBSCRIBE_IMAGE}
//         alt="unsubscribeImage"
//       />
//       <span id={styles.message}>초대받은 대시보드가 없습니다.</span>
//     </div>
//   ) : (
//     <>
//       {' '}
//       {isMobile ? (
//         <>
//           {' '}
//           {filteredInviteData &&
//             filteredInviteData.map((invite, index) => (
//               <div key={index} className={styles.dashContainer}>
//                 <div className={styles.dashContent}>
//                   <span id={styles.name}>이름</span>
//                   <span id={styles.dashName}>{invite.dashboard.title}</span>
//                   <span id={styles.invite}>초대자</span>
//                   <span id={styles.dashInvite}>
//                     {invite.inviter.nickname}
//                   </span>
//                 </div>
//                 <div className={styles.buttonContainer}>
//                   <AcceptButton onClick={() => acceptInvite(invite.id)} />
//                   <RejectButton onClick={() => rejectInvite(invite.id)} />
//                 </div>
//               </div>
//             ))}
//         </>
//       ) : (
//         <>
//           <div className={styles.contentTitle}>
//             <span id={styles.name}>이름</span>
//             <span id={styles.invite}>초대자</span>
//             <span id={styles.agree}>수락여부</span>
//           </div>
//           {filteredInviteData &&
//             filteredInviteData.map((invite, index) => (
//               <div key={index} className={styles.dashContainer}>
//                 <span id={styles.dashName}>{invite.dashboard.title}</span>
//                 <span id={styles.dashInvite}>
//                   {invite.inviter.nickname}
//                 </span>
//                 <div className={styles.buttonContainer}>
//                   <AcceptButton onClick={() => acceptInvite(invite.id)} />
//                   <RejectButton onClick={() => rejectInvite(invite.id)} />
//                 </div>
//               </div>
//             ))}
//         </>
//       )}
//     </>
//   )}
// </div>
