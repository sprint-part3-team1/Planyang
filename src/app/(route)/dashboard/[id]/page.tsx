'use client';

import useAppSelector from '@/app/_hooks/useAppSelector';
import { useEffect, useState } from 'react';
import { dashBoardDetailActions } from '@/app/_slice/dashBoardDetail';
import { registerActions } from '@/app/_slice/registerSlice';
import { columnActions, columnData } from '@/app/_slice/columnSlice';
import styles from '@/app/(route)/dashboard/[id]/page.module.css';
import AddColumnButton from '@/app/_components/Button/AddColumnButton/AddColumnButton';
import MODAL_TYPES from '@/app/constants/modalTypes';
import ModalPortal from '@/app/_components/modal/modalPortal/ModalPortal';
import { useDispatch } from 'react-redux';

import Column from '../_components/Column';
import { cardActions } from '@/app/_slice/cardSlice';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import useAppDispatch from '@/app/_hooks/useAppDispatch';
import axios from 'axios';

const DashBoard = ({ params }: { id: string }) => {
  const columnDataList = useAppSelector(columnData);

  const [openModalType, setOpenModalType] = useState('');
  const [cardInfo, setCardInfo] = useState(null);
  const [totalCount, setTotalCount] = useState<Record<number, number>>();
  const dispatch = useDispatch();

  const handleDrop = async (item, droppedColumnId) => {
    try {
      const updatedItem = {
        columnId: droppedColumnId,
        assigneeUserId: item.assignee.id,
        title: item.title,
        description: item.description,
        dueDate: item.dueDate,
        tags: item.tags,
        imageUrl: item.imageUrl,
      };

      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.put(
        `https://sp-taskify-api.vercel.app/4-1/cards/${item.id}`,
        updatedItem,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

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
    fetchRegister();
    fetchColumns();
  }, [params.id, dispatch]);

  return (
    <>
      <div className={styles.container}>
        <DndProvider backend={HTML5Backend}>
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
                  onDrop={(itemId) => handleDrop(itemId, item.id)}
                />
              );
            })}
            <div className={styles.buttonContainer}>
              <div onClick={() => setOpenModalType(MODAL_TYPES.newColumn)}>
                <AddColumnButton />
              </div>
            </div>
          </div>
        </DndProvider>
      </div>
      <ModalPortal
        openModalType={openModalType}
        setOpenModalType={setOpenModalType}
      />
    </>
  );
};

export default DashBoard;
