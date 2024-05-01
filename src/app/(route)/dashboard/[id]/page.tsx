'use client';

import useAppSelector from '@/app/_hooks/useAppSelector';
import { useEffect, useState } from 'react';
import { dashBoardDetailActions } from '@/app/_slice/dashBoardDetail';
import { columnActions, columnData } from '@/app/_slice/columnSlice';
import styles from '@/app/(route)/dashboard/[id]/page.module.css';
import AddColumnButton from '@/app/_components/Button/AddColumnButton/AddColumnButton';
import MODAL_TYPES from '@/app/constants/modalTypes';
import ModalPortal from '@/app/_components/modal/modalPortal/ModalPortal';
import { useParams } from 'next/navigation';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import axios from 'axios';
import useAppDispatch from '@/app/_hooks/useAppDispatch';
import Column from '../_components/Column';

const DashBoard = () => {
  const columnDataList = useAppSelector(columnData);
  const dispatch = useAppDispatch();
  const params = useParams();

  const [openModalType, setOpenModalType] = useState('');
  const [isUpdated, setIsUpdated] = useState(false);

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
  const fetchColumns = async () => {
    try {
      await dispatch(
        columnActions.asyncFetchGetColumn({ dashboardId: Number(params.id) }),
      );
    } catch (error) {
      console.error('Error fetching columns:', error);
    }
  };

  const handleDrop = async (item, droppedColumnId) => {
    setIsUpdated(false);
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
      setIsUpdated(true);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDashboardDetail();
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
                  onDrop={(itemId) => handleDrop(itemId, item.id)}
                  isUpdated={isUpdated}
                  setIsUpdated={setIsUpdated}
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
