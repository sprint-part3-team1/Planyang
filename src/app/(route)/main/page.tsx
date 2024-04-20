// import Card from '../dashboard/_components/Card';
import Column from '../dashboard/_components/Column';
import EditDashName from '../mydashboard/_components/EditDashName';
import styles from './page.module.css';

export default function Main() {
  return (
    <div className={styles.container}>
      <br />
      {/* <Card
        nickname="Banana"
        title="새로운 일정 관리 Taskify"
        tagNameArr={['프로젝트', '백엔드']}
        date="2022.12.31"
      /> */}
      <br />
      {/* <Card
        nickname="Banana"
        title="새로운 일정 관리 Taskify"
        tagNameArr={['프로젝트', '백엔드']}
        date="2022.12.31"
        image="/assets/images/logoImg.svg"
      /> */}
      {/* 데시보드 id에 따른 데이터를 받아서 map함수를 돌리면서 각각의 데이터별로 아래의 컬럼 컴포넌트를 호출하는 페이지 */}
      {/* <Column /> */}
      <EditDashName />
    </div>
  );
}
