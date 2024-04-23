'use client';

import useAppDispatch from '@/app/_hooks/useAppDispatch';
import useAppSelector from '@/app/_hooks/useAppSelector';
import { useEffect, useState } from 'react';
import {
  dashBoardDetailData,
  dashBoardDetailActions,
} from '@/app/_slice/dashBoardDetail';
import { memberActions, memberData } from '@/app/_slice/memberSlice';
import { registerActions, userResponse } from '@/app/_slice/registerSlice';
import { columnActions, columnData } from '@/app/_slice/columnSlice';
import styles from '@/app/(route)/dashboard/[id]/page.module.css';
import AddColumnButton from '@/app/_components/Button/AddColumnButton/AddColumnButton';
import MODAL_TYPES from '@/app/constants/modalTypes';
import ModalPortal from '@/app/_components/modal/modalPortal/ModalPortal';
import SideMenu from '../../mydashboard/_components/SideMenu';
import Column from '../_components/Column';

const DashBoard = ({ params }: { params: { id: string } }) => {
  const dispatch = useAppDispatch();
  const columnDataList = useAppSelector(columnData);

  const [openModalType, setOpenModalType] = useState('');
  const [cardInfo, setCardInfo] = useState();
  const [totalCount, setTotalCount] = useState<Record<number, number>>();

  useEffect(() => {
    const fetchDashboardDetail = async () => {
      try {
        await dispatch(
          dashBoardDetailActions.asyncFetchGetDashBoardDetail({
            dashBoardId: Number(params.id),
          }),
        );
      } catch (error) {
        console.error('Error fetching dashboard detail:', error);
      }
    };
    const fetchMember = async () => {
      try {
        await dispatch(
          memberActions.asyncGetMembers({
            dashboardId: Number(params.id),
          }),
        );
      } catch (error) {
        console.error('Error fetching member List:', error);
      }
    };
    const fetchRegister = async () => {
      try {
        await dispatch(registerActions.asynchFetchgetUserInfo());
      } catch (error) {
        console.error('Error fetching register:', error);
      }
    };
    const fetchColumns = async () => {
      try {
        await dispatch(
          columnActions.asyncFetchGetColumn({ dashboardId: Number(params.id) }),
        );
      } catch (error) {
        console.error('Error fetching columns:', error);
      }
    };

    fetchDashboardDetail();
    fetchMember();
    fetchRegister();
    fetchColumns();
  }, [params.id, dispatch]);

  return (
    <>
      <SideMenu />
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
