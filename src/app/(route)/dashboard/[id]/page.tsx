'use client';

import useAppSelector from '@/app/_hooks/useAppSelector';
import { useEffect, useState } from 'react';
import { dashBoardDetailActions } from '@/app/_slice/dashBoardDetail';
import { columnActions, columnData } from '@/app/_slice/columnSlice';
import styles from '@/app/(route)/dashboard/[id]/page.module.css';
import AddColumnButton from '@/app/_components/Button/AddColumnButton/AddColumnButton';
import MODAL_TYPES from '@/app/constants/modalTypes';
import ModalPortal from '@/app/_components/modal/modalPortal/ModalPortal';
import { useDispatch } from 'react-redux';
import { useParams } from 'next/navigation';
import Column from '../_components/Column';

const DashBoard = () => {
  const columnDataList = useAppSelector(columnData);
  const dispatch = useDispatch();
  const params = useParams();

  const [openModalType, setOpenModalType] = useState('');
  const [cardInfo, setCardInfo] = useState(null);
  const [totalCount, setTotalCount] = useState<Record<number, number>>();

  const fetchDashboardDetail = async () => {
    try {
      dispatch(
        dashBoardDetailActions.asyncFetchGetDashBoardDetail({
          dashBoardId: Number(params.id),
        }),
      );
    } catch (error) {
      console.error('Error fetching dashboard detail:', error);
    }
  };

  const fetchColumns = async () => {
    try {
      dispatch(
        columnActions.asyncFetchGetColumn({ dashboardId: Number(params.id) }),
      );
    } catch (error) {
      console.error('Error fetching columns:', error);
    }
  };

  useEffect(() => {
    fetchDashboardDetail();
    fetchColumns();
  }, [params.id, dispatch]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.columnsContainer}>
          {columnDataList?.data?.map((item) => {
            return (
              <Column
                key={item.id}
                columnData={item}
                cardInfo={cardInfo}
                setCardInfo={setCardInfo}
                totalCount={totalCount}
                setTotalCount={setTotalCount}
              />
            );
          })}
          <div className={styles.buttonContainer}>
            <div onClick={() => setOpenModalType(MODAL_TYPES.newColumn)}>
              <AddColumnButton />
            </div>
          </div>
        </div>
      </div>
      <ModalPortal
        openModalType={openModalType}
        setOpenModalType={setOpenModalType}
      />
    </>
  );
};

export default DashBoard;
