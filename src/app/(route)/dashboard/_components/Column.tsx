import Image from 'next/image';
import AddTodoButton from '@/app/_components/Button/AddTodoButton/AddTodoButton';
import styles from './Column.module.css';
import Card from './Card';

const Column = () => {
  // 흘러가는 로직 정리 : 일단 '/mydashboard'페이지에서 해당 데시보드를 클릭하면
  // '/dashboard/{dashboardid}'로 이동

  // 1. 이때 dashboardid를 가지고 !!컬럼 조회!! 를 한다.
  // -> 조회한 컬럼 데이터들 중에서 id와 title을 가져와서
  // -> title은 해당 컬럼의 제목에 적고
  // -> id로는 !!카드 조회!!를 한다. (columnId)

  // 2. 그 결과 나온 데이터들 중에서
  // -> title, tags, dueDate, profileImageUrl, nickname, imageUrl를 사용하여
  // -> 카드 호출

  // 받을 데이터 : 현재 컬럼 이름과 현재 컬럼에 해당되는 카드 데이터들
  const ELLIPSE_ICON = '/assets/icons/profileEllipse.svg';
  const SETTING_ICON = '/assets/icons/setting.svg';
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.columnName}>
          <Image width={8} height={8} src={ELLIPSE_ICON} alt="ellipseIcon" />
          <span>On Progress</span>
          <div className={styles.cardCount}>2</div>
        </div>
        <Image
          id={styles.settingIcon}
          width={24}
          height={24}
          src={SETTING_ICON}
          alt="settingIcon"
        />
      </div>
      <div className={styles.cardSection}>
        <AddTodoButton />
        <Card
          nickname="Banana"
          title="새로운 일정 관리 Taskify"
          tagNameArr={['프로젝트', '백엔드']}
          date="2022.12.31"
        />
        <Card
          nickname="Banana"
          title="새로운 일정 관리 Taskify"
          tagNameArr={['프로젝트', '백엔드']}
          date="2022.12.31"
          image="/assets/images/logoImg.svg"
        />
      </div>
    </div>
  );
};

export default Column;
