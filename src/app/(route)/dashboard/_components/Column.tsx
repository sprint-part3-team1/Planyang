import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import AddTodoButton from '@/app/_components/Button/AddTodoButton/AddTodoButton';
import MODAL_TYPES from '@/app/constants/modalTypes';
import ModalPortal from '@/app/_components/modal/modalPortal/ModalPortal';
import axios from 'axios';
import {
  CardResponseType,
  cardActions,
  cardData,
} from '@/app/_slice/cardSlice';
import { useInView } from 'react-intersection-observer';
import { useDrop } from 'react-dnd';
import useAppSelector from '@/app/_hooks/useAppSelector';
import useAppDispatch from '@/app/_hooks/useAppDispatch';
import styles from './Column.module.css';
import Card from './Card';

const axiosInstance = axios.create({
  baseURL: `https://sp-taskify-api.vercel.app/4-1/`,
  timeout: 5000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

interface Props {
  columnData: [
    {
      createdAt: string;
      dashboardId: number;
      id: number;
      teamId: string;
      title: string;
      updatedAt: string;
    },
  ];
  cardInfo: Record<string, CardResponseType[]> | undefined;
  setCardInfo: Dispatch<
    SetStateAction<Record<string, CardResponseType[]> | undefined>
  >;
  totalCount: Record<number, number> | undefined;
  setTotalCount: Dispatch<SetStateAction<Record<number, number> | undefined>>;
  onDrop: () => void;
  isUpdated: boolean;
  setIsUpdated: React.Dispatch<SetStateAction<boolean>>;
}

const Column = ({
  columnData,
  cardInfo,
  setCardInfo,
  totalCount,
  setTotalCount,
  onDrop,
  isUpdated,
  setIsUpdated,
}: Props) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'item',
    drop: (item) => onDrop(item, columnData.id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });
  const ELLIPSE_ICON = '/assets/icons/profileEllipse.svg';
  const SETTING_ICON = '/assets/icons/setting.svg';

  const GET_CARDS = 8;

  const [pages, setPages] = useState<number>(GET_CARDS);
  const [openModalType, setOpenModalType] = useState('');
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView({
    threshold: 1,
  });

  const dispatch = useAppDispatch();
  const cardDatas = useAppSelector(cardData);

  const fetchCardList = async (columnId: number) => {
    try {
      await dispatch(cardActions.asyncFetchGetCards({ columnId }));
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  const viewCards = async (columId: number) => {
    setLoading(true);
    await axiosInstance
      .get(`cards?size=${pages}&columnId=${columId}`)
      .then((res) => {
        setCardInfo((prev) => ({
          ...prev,
          [columId]: res.data.cards,
        }));
        setTotalCount((prev) => ({
          ...prev,
          [columId]: res.data.totalCount,
        }));
      })
      .catch((error) => console.log(`카드 목록 조회 실패(${error})`));
    setLoading(false);
  };

  const cardDataList = (cardInfo && cardInfo[columnData.id]) || [];

  useEffect(() => {
    fetchCardList(columnData.id);
  }, []);

  // TODO: cardDatas 형식 수정 필요
  useEffect(() => {
    viewCards(columnData.id);
  }, [pages, isUpdated, setIsUpdated, cardDatas]);

  useEffect(() => {
    if (inView && !loading) {
      setTimeout(() => {
        setPages((prev) => prev + GET_CARDS);
      }, 500);
    }
  }, [inView]);

  return (
    <div
      className={styles.container}
      ref={drop}
      style={{ filter: isOver && 'brightness(90%)' }}
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
        {cardDataList.map((card) => (
          <Card
            key={card.id}
            nickname={card.assignee.nickname}
            profileImageUrl={card.assignee.profileImageUrl}
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
      {totalCount && totalCount[columnData.id] >= pages && <div ref={ref} />}
    </div>
  );
};

export default Column;
