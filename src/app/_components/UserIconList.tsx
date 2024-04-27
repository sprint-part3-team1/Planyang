import React, { useEffect, useRef, useState } from 'react';
import { MemberListDto } from '@/app/_types/_dto/MemberListDto';
import UserIcon from '@/app/_components/UserIcon';
import NumberIcon from '@/app/_components/NumberIcon';
import styles from './UserIconList.module.css';
import fetchMemberData from '../(route)/mydashboard/_api/fetchMemberDatat';
import useAppSelector from '../_hooks/useAppSelector';
import { dashBoardDetailData } from '../_slice/dashBoardDetail';

const UserIconList = ({ totalCount }: MemberListDto) => {
  const DESKTOP_WIDTH = 1024;
  const [memberData, setMemberData] = useState(null);
  const dashboardDetailDatas = useAppSelector(dashBoardDetailData);
  const calcWrapperWidth = (count: number) => {
    if (count <= 0) {
      return 0;
    }
    if (count === 1) {
      return 38;
    }
    return 38 + 30 * (count - 1);
  };

  const leftValue = (index: number) => 30 * index;

  const [listStyle, setListStyle] = useState(false);

  const lastWidth = useRef(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (dashboardDetailDatas?.id) {
          // dashboardDetailDatas?.id가 존재하고 유효한 경우에만 실행
          const data = await fetchMemberData(1, dashboardDetailDatas?.id);
          setMemberData(data);
        }
      } catch (error) {
        console.error('Error fetching MemberDatas', error);
      }
    };
    fetchData();
  }, [dashboardDetailDatas?.id]);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth >= DESKTOP_WIDTH) {
          setListStyle(true);
        } else {
          setListStyle(false);
        }
        lastWidth.current = window.innerWidth;
      }
    };

    handleResize();

    if (typeof window !== 'undefined') {
      // Check if window is defined (browser environment)
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []); // Empty dependency array ensures this effect runs only once

  const setListType = (breakPoint: number, count: number) => {
    return new Array(Math.min(breakPoint, count))
      .fill(null)
      .map((value, index) => {
        return memberData?.members && memberData?.members[index] ? (
          index + 1 < breakPoint ? (
            <div
              key={index}
              className={styles.iconWrapper}
              style={{ left: leftValue(index) }}
            >
              <UserIcon
                key={index}
                nickname={memberData?.members[index].nickname}
                profileImageUrl={memberData?.members[index].profileImageUrl}
              />
            </div>
          ) : count >= breakPoint ? (
            <div
              key={index}
              className={styles.iconWrapper}
              style={{ left: leftValue(index) }}
            >
              <NumberIcon key={index} count={count - breakPoint + 1} />
            </div>
          ) : null
        ) : null;
      });
  };

  return (
    <div>
      {listStyle ? (
        <div
          className={styles.entireWrapper}
          style={{ width: calcWrapperWidth(Math.min(totalCount, 5)) }}
        >
          {setListType(5, totalCount)}
        </div>
      ) : (
        <div
          className={styles.entireWrapper}
          style={{ width: calcWrapperWidth(Math.min(totalCount, 3)) }}
        >
          {setListType(3, totalCount)}
        </div>
      )}
    </div>
  );
};

export default UserIconList;
