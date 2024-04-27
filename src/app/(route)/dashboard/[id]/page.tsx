'use client';

import useAppSelector from '@/app/_hooks/useAppSelector';
import { useState } from 'react';
import { columnData } from '@/app/_slice/columnSlice';
import styles from '@/app/(route)/dashboard/[id]/page.module.css';
import AddColumnButton from '@/app/_components/Button/AddColumnButton/AddColumnButton';
import MODAL_TYPES from '@/app/constants/modalTypes';
import ModalPortal from '@/app/_components/modal/modalPortal/ModalPortal';
import Column from '../_components/Column';

const DashBoard = () => {
  const columnDataList = useAppSelector(columnData);

  const [openModalType, setOpenModalType] = useState('');
  const [cardInfo, setCardInfo] = useState(null);
  const [totalCount, setTotalCount] = useState<Record<number, number>>();

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
