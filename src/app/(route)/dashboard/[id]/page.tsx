'use client';

import {
  dashBoardDetailData,
  dashBoardDetailActions,
} from '@/app/_slice/dashBoardDetail';
import useAppDispatch from '@/app/_hooks/useAppDispatch';
import useAppSelector from '@/app/_hooks/useAppSelector';
import { useEffect } from 'react';
import { dashBoardData } from '@/app/_slice/dashBoardSlice';

const DashBoard = ({ params }: { params: { id: string } }) => {
  const dispatch = useAppDispatch();
  const dashBoardDetailDatas = useAppSelector(dashBoardDetailData);

  console.log(params.id);
  console.log(params.id);
  console.log(params.id);
  console.log(params.id);

  useEffect(() => {
    const fetchDashboardDetail = async () => {
      try {
        await dispatch(
          dashBoardDetailActions.asyncFetchGetDashBoardDetail({
            dashBoardId: params.id,
          }),
        );
      } catch (error) {
        console.error('Error fetching dashboard detail:', error);
      }
    };

    fetchDashboardDetail();
  }, [params.id, dispatch]);

  console.log(dashBoardDetailDatas);
  return (
    <>
      <h1>대시보드 ID : {dashBoardDetailDatas?.id}</h1>
      <h1>대시보드 제목 : {dashBoardDetailDatas?.title}</h1>
    </>
  );
};

export default DashBoard;
