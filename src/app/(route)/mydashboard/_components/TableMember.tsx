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

  const onRightButtonClick = () => {
    if (memberDatas?.totalCount) {
      if (page * 4 < memberDatas.totalCount) {
        setPage((prev) => prev + 1);
      }
    }
  };

  const onLeftButtonClick = () => {
    if (page !== 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleDeleteAndNavigate = async (memberId: number) => {
    await dispatch(memberActions.asyncDeleteMember({ memberId }));
    await dispatch(
      memberActions.asyncGetMembers({
        dashboardId: dashBoardDetailDatas?.id,
        page,
      }),
    );
    if (memberDatas?.members.length === 1) {
      setPage((prev) => Math.max(prev - 1, 1));
    }
  };

  const [isLeftActive, setIsLeftActive] = useState(false);
  const [isRightActive, setIsRightActive] = useState(false);

  useEffect(() => {
    // if (dashBoardDetailDatas?.id) {

    // }
    getMember(dashBoardDetailDatas?.id, page);
  }, [dashBoardDetailDatas?.id, page]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span id={styles.titleMember}>구성원</span>
        <div className={styles.pagination}>
          <span>1 페이지 중 {page}</span>
          <ArrowButton
            isLeftActive={isLeftActive}
            isRightActive={isRightActive}
            onRightButtonClick={onRightButtonClick}
            onLeftButtonClick={onLeftButtonClick}
          />
        </div>
      </div>
      <span className={styles.name}> 이름</span>
      {memberDatas?.members.map((i) => (
        <div key={i.id} className={styles.memberContainer}>
          <div className={styles.profileFrame}>
            <UserIcon
              nickname={i.nickname}
              profileImageUrl={i.profileImageUrl}
            />
            <span id={styles.memberName}>{i.nickname}</span>
          </div>
          {!i.isOwner && (
            <DeleteButton
              id={i.id}
              handleDeleteAndNavigate={handleDeleteAndNavigate}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default TableMember;
