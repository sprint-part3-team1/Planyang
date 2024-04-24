import Image from 'next/image';
import { DashBoardInformationType } from '@/app/_slice/dashBoardSlice';

import Link from 'next/link';
import { useState } from 'react';
import MODAL_TYPES from '@/app/constants/modalTypes';
import ModalPortal from '@/app/_components/modal/modalPortal/ModalPortal';
import styles from './SideMenu.module.css';
import DashBoardColorCircle from './DashBoardColorCircle';

interface SideMenuPropsType {
  dashBoardData: DashBoardInformationType[];
}

const SideMenu = ({ dashBoardData }: SideMenuPropsType) => {
  const [openModalType, setOpenModalType] = useState('');

  const LOGO_IMAGE = '/assets/images/logoImg.svg';
  const LOGO_TITLE = '/assets/images/logoTitle.svg';
  const VECTOR_ICON_SRC = '/assets/icons/vector.svg';
  const CROWN_ICON_SRC = '/assets/icons/crown.svg';
  return (
    <div className={styles.container}>
      <div className={styles.logoFrame}>
        <a href="/mydashboard">
          <Image
            width={28.815}
            height={33.069}
            src={LOGO_IMAGE}
            alt="logoImg"
          />
          <Image
            width={80}
            height={22}
            id={styles.logoTitle}
            src={LOGO_TITLE}
            alt="logoTitle"
          />
        </a>
      </div>
      <div className={styles.titleWrapper}>
        <span id={styles.title}>Dash Boards</span>
        <ModalPortal
          openModalType={openModalType}
          setOpenModalType={setOpenModalType}
        />
        <Image
          width={20}
          height={20}
          id={styles.vector}
          src={VECTOR_ICON_SRC}
          alt="vector"
          onClick={() => {
            setOpenModalType(MODAL_TYPES.newDashboard);
          }}
        />

        {/* onClick 모달창 연결 */}
      </div>

      <div className={styles.listWrapper}>
        {/* 반복문으로 대시보드 띄워주기 */}

        {dashBoardData?.map((item) => {
          return (
            <Link
              className={styles.dashList}
              href={`/dashboard/${item.id}`}
              key={item.id}
            >
              <div>
                <DashBoardColorCircle color={item.color} />
              </div>
              <span id={styles.dashBoardName}>{item.title}</span>
              {item.createdByMe && (
                <Image
                  id={styles.crown}
                  width={17.59}
                  height={14}
                  src={CROWN_ICON_SRC}
                  alt="crown"
                />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SideMenu;
