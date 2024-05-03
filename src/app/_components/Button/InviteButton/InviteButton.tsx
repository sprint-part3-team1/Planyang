import Image from 'next/image';
import MODAL_TYPES from '@/app/constants/modalTypes';
import ModalPortal from '@/app/_components/modal/modalPortal/ModalPortal';
import { useState } from 'react';
import styles from './InviteButton.module.css';

const InviteButton = () => {
  const WHITE_VECTOR = '/assets/icons/whiteVector.svg';
  const [openModalType, setOpenModalType] = useState('');

  const handleInviteButton = () => {
    setOpenModalType(MODAL_TYPES.inviteByEmail);
  };
  return (
    <>
      <ModalPortal
        openModalType={openModalType}
        setOpenModalType={setOpenModalType}
      />
      <button
        style={{ cursor: 'pointer' }}
        type="button"
        className={styles.inviteBtn}
        onClick={handleInviteButton}
      >
        <div className={styles.content}>
          <Image
            width={16}
            height={16}
            src={WHITE_VECTOR}
            alt="vector"
            className={styles.vector}
          />
          <span>초대하기</span>
        </div>
      </button>
    </>
  );
};

export default InviteButton;
