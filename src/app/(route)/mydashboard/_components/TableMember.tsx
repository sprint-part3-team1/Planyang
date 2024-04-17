import Image from 'next/image';
import styles from './TableMember.module.css';
import ArrowButton from '../../../_components/Button/ArrowButton/ArrowButton';
import DeleteButton from '../../../_components/Button/DeleteButton/DeleteButton';

const TableMember = () => {
  const PROFILE_ELLIPSE = '/assets/icons/profileEllipse.svg';
  const memberData = [
    { name: '정만철', image: PROFILE_ELLIPSE },
    { name: '김태순', image: PROFILE_ELLIPSE },
    { name: '최주협', image: PROFILE_ELLIPSE },
    { name: '윤지현', image: PROFILE_ELLIPSE },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span id={styles.titleMember}>구성원</span>
        <div className={styles.pagination}>
          <span>1 페이지 중 1</span>
          <ArrowButton />
        </div>
      </div>
      <span className={styles.name}> 이름</span>
      {memberData.map((member, index) => (
        <div key={index} className={styles.memberContainer}>
          <div className={styles.profileFrame}>
            <Image
              width={38}
              height={38}
              src={member.image}
              alt={member.name}
              className={styles.memberImage}
            />
            <span id={styles.memberName}>{member.name}</span>
          </div>
          <DeleteButton />
        </div>
      ))}
    </div>
  );
};

export default TableMember;
