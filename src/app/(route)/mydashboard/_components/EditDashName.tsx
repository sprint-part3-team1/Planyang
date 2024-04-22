import Image from 'next/image';
import EditButton from '@/app/_components/Button/EditButton/EditButton';
import styles from './EditDashName.module.css';

const EditDashName = () => {
  const ELLIPSE_ICON = '/assets/icons/profileEllipse.svg';
  // 받아야 할 데이터 : 해당 대시보드의 이름, 색상정하는 컴포넌트 (임의의 이미지 대신에 )

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span>비브리지</span>
        {/* 색상 이미지로 대체 필요 */}
        <Image width={24} height={24} src={ELLIPSE_ICON} alt="ellipseIcon" />
      </div>
      <span id={styles.inputTitle}>데시보드 이름</span>
      <input id={styles.input} />
      <div className={styles.editBtn}>
        <EditButton />
      </div>
    </div>
  );
};

export default EditDashName;
