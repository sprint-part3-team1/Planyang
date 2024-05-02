'use client';

import DashboardListNavBar from '@/app/_components/_navbar/_dashboardNavbar/_dashboardListType/DashboardListNavBar';
import React, { ReactNode, useEffect } from 'react';
import {
  dashBoardDetailActions,
  dashBoardDetailData,
} from '@/app/_slice/dashBoardDetail';
import useAppDispatch from '@/app/_hooks/useAppDispatch';

import { columnActions } from '@/app/_slice/columnSlice';
import DashboardNavBar from '@/app/_components/_navbar/_dashboardNavbar/_dashboardType/DashboardNavBar';
import useAppSelector from '@/app/_hooks/useAppSelector';
import { loginActions, loginData } from '@/app/_slice/loginSlice';
import { dashBoardActions, dashBoardData } from '@/app/_slice/dashBoardSlice';
import { registerActions, userResponse } from '@/app/_slice/registerSlice';
import { memberActions, memberData } from '@/app/_slice/memberSlice';

const DashBoardDetailLayout = ({
  children,
  params,
}: {
  children: ReactNode;
  params: { id: string };
}) => {
  const dispatch = useAppDispatch();
  const dashboardDetailDatas = useAppSelector(dashBoardDetailData);
  const dashboardDatas = useAppSelector(dashBoardData);
  const userInfo = useAppSelector(userResponse);
  const memberInfo = useAppSelector(memberData);

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

    const fetchColumns = async () => {
      try {
        await dispatch(
          columnActions.asyncFetchGetColumn({ dashboardId: Number(params.id) }),
        );
      } catch (error) {
        console.error('Error fetching columns:', error);
      }
    };

    const fetchUserInfo = async () => {
      try {
        await dispatch(registerActions.asynchFetchgetUserInfo());
      } catch (error) {
        console.error('Error fetching userInfo:', error);
      }
    };

    const fetchMemberInfo = async () => {
      try {
        await dispatch(
          memberActions.asyncGetMembers({ dashboardId: params.id, page: 1 }),
        );
      } catch (error) {
        console.error('Error fetching memberData', error);
      }
    };

    fetchDashboardDetail();
    fetchColumns();
    fetchUserInfo();
    fetchMemberInfo();
  }, [params.id, dispatch, dashboardDatas]);

  return (
    <div style={{ width: '100%' }}>
      <DashboardNavBar
        createdByMe={dashboardDetailDatas?.createdByMe}
        dashboardTitle={dashboardDetailDatas?.title}
        userInfo={userInfo}
        boardId={params.id}
      />
      {children}
    </div>
  );
};

export default DashBoardDetailLayout;
