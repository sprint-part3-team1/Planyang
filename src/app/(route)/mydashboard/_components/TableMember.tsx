import Image from 'next/image';
import { memberActions, memberData } from '@/app/_slice/memberSlice';
import useAppDispatch from '@/app/_hooks/useAppDispatch';
import { useEffect } from 'react';
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
  const getMember = (dashboardId: number | undefined) => {
    dispatch(
      memberActions.asyncGetMembers({
        dashboardId,
      }),
    );
  };

  useEffect(() => {
    if (dashBoardDetailDatas?.id) {
      // 값이 있는지 확인
      getMember(dashBoardDetailDatas.id);
    }
  }, [dashBoardDetailDatas?.id]); // dashBoardDetailDatas.id를 의존성 배열에 추가

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span id={styles.titleMember}>구성원</span>
        <div className={styles.pagination}>
          <span>1 페이지 중 1</span>
          <ArrowButton />
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
            <DeleteButton id={i.id} />
          </div>
        );
      })}
    </div>
  );
};

export default TableMember;
