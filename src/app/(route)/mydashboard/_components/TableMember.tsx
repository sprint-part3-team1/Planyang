import Image from 'next/image';
import { memberActions, memberData } from '@/app/_slice/memberSlice';
import useAppDispatch from '@/app/_hooks/useAppDispatch';
import { useEffect, useState } from 'react';
import { dashBoardDetailData } from '@/app/_slice/dashBoardDetail';
import useAppSelector from '@/app/_hooks/useAppSelector';
import UserIcon from '@/app/_components/UserIcon';
import styles from './TableMember.module.css';
import ArrowButton from '../../../_components/Button/ArrowButton/ArrowButton';
import DeleteButton from '../../../_components/Button/DeleteButton/DeleteButton';

const TableMember = () => {
  const dispatch = useAppDispatch();
  const PROFILE_ELLIPSE = '/assets/icons/profileEllipse.svg';
  const dashBoardDetailDatas = useAppSelector(dashBoardDetailData);
  const memberDatas = useAppSelector(memberData);
  const getMember = (dashboardId: number | undefined, page: number) => {
    dispatch(
      memberActions.asyncGetMembers({
        dashboardId,
        page,
      }),
    );
  };
  const [page, setPage] = useState(1);
  console.log(memberDatas?.members.length);
  const onRightButtonClick = () => {
    if (page * 4 < memberDatas?.totalCount) {
      setPage((prev) => prev + 1);
    }
  };

  const onLeftButtonClick = () => {
    if (page !== 1) {
      setPage((prev) => prev - 1);
    }
  };
  useEffect(() => {
    if (dashBoardDetailDatas?.id) {
      // 값이 있는지 확인
      getMember(dashBoardDetailDatas.id, page);
    }
  }, [dashBoardDetailDatas?.id, page]); // dashBoardDetailDatas.id를 의존성 배열에 추가

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span id={styles.titleMember}>구성원</span>
        <div className={styles.pagination}>
          <span>1 페이지 중 {page}</span>
          <ArrowButton
            setPage={setPage}
            onRightButtonClick={onRightButtonClick}
            onLeftButtonClick={onLeftButtonClick}
          />
        </div>
      </div>
      <span className={styles.name}> 이름</span>
      {memberDatas?.members.map((i) => {
        return (
          <div key={i.id} className={styles.memberContainer}>
            <div className={styles.profileFrame}>
              <UserIcon
                nickname={i.nickname}
                profileImageUrl={i.profileImageUrl}
              />

              <span id={styles.memberName}>{i.nickname}</span>
            </div>
            <DeleteButton
              id={i.id}
              setPage={setPage}
              member={memberDatas.members}
            />
          </div>
        );
      })}
    </div>
  );
};

export default TableMember;
