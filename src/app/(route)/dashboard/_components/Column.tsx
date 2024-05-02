import React, { useEffect, useState, SetStateAction } from 'react';
import Image from 'next/image';
import AddTodoButton from '@/app/_components/Button/AddTodoButton/AddTodoButton';

import MODAL_TYPES from '@/app/constants/modalTypes';
import ModalPortal from '@/app/_components/modal/modalPortal/ModalPortal';
import { cardActions } from '@/app/_slice/cardSlice';
import { useInView } from 'react-intersection-observer';
import { useDrop } from 'react-dnd';
import useAppDispatch from '@/app/_hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/_store/store';
import styles from './Column.module.css';
import Card from './Card';

interface Props {
  columnData: {
    createdAt: string;
    dashboardId: number;
    id: number;
    teamId: string;
    title: string;
    updatedAt: string;
  };
  onDrop: (itemId: number, columnid: number) => void;
  isUpdated: boolean;
  setIsUpdated: React.Dispatch<SetStateAction<boolean>>;
}

const Column = ({ columnData, onDrop, isUpdated, setIsUpdated }: Props) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'item',
    drop: (item: number) => onDrop(item, columnData.id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });
  const ELLIPSE_ICON = '/assets/icons/profileEllipse.svg';
  const SETTING_ICON = '/assets/icons/setting.svg';

  const GET_CARDS = 8;

  const [cardInfo, setCardInfo] = useState<any>(null);
  const [sizes, setSizes] = useState<number>(GET_CARDS);
  const [openModalType, setOpenModalType] = useState('');
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState<Record<number, number>>();

  const { ref, inView } = useInView({
    threshold: 1,
  });

  const dispatch = useAppDispatch();

  const { isChange } = useSelector(
    (state: RootState) => state.changedCardState,
  );
  const fetchCardList = async (columnId: number) => {
    setLoading(true);
    try {
      await dispatch(cardActions.asyncFetchGetCards({ sizes, columnId })).then(
        (response: any) => {
          setCardInfo((prev: any) => ({
            ...prev,
            [columnId]: response.payload.cards,
          }));
          setTotalCount((prev) => ({
            ...prev,
            [columnId]: response.payload.totalCount,
          }));
        },
      );
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
    setLoading(false);
  };

  const cardDataList = (cardInfo && cardInfo[columnData.id]) || [];

  useEffect(() => {
    fetchCardList(columnData.id);
  }, [sizes, isUpdated, setIsUpdated, dispatch, isChange]);

  useEffect(() => {
    if (inView && !loading) {
      setTimeout(() => {
        setSizes((prev) => prev + GET_CARDS);
      }, 500);
    }
  }, [inView]);

  return (
    <div
      className={styles.container}
      // ref={drop}
      style={{ filter: isOver ? 'brightness(90%)' : undefined }}
    >
      <div className={styles.title}>
        <div className={styles.columnName}>
          <Image width={8} height={8} src={ELLIPSE_ICON} alt="ellipseIcon" />
          <span>{columnData.title}</span>
          <div className={styles.cardCount}>
            {totalCount && totalCount[columnData.id]}
          </div>
        </div>
        <button
          type="button"
          className={styles.columnSettingButton}
          onClick={() => setOpenModalType(MODAL_TYPES.columnManagement)}
        >
          <Image
            id={styles.settingIcon}
            width={24}
            height={24}
            src={SETTING_ICON}
            alt="settingIcon"
          />
        </button>
      </div>
      <div className={styles.cardSection}>
        <div onClick={() => setOpenModalType(MODAL_TYPES.createTask)}>
          <AddTodoButton />
        </div>
        {cardDataList &&
          cardDataList.map((card: any) => (
            <Card
              key={card.id}
              nickname={card?.assignee?.nickname}
              profileImageUrl={card?.assignee?.profileImageUrl}
              title={card.title}
              tagNameArr={card.tags}
              date={card.dueDate}
              image={card.imageUrl}
              cardInfo={card}
            />
          ))}
      </div>
      <ModalPortal
        openModalType={openModalType}
        setOpenModalType={setOpenModalType}
        inputInitialValue={columnData.title}
        requestId={columnData.id}
      />
      {totalCount && totalCount[columnData.id] >= sizes && <div ref={ref} />}
    </div>
  );
};

export default Column;
