// import Card from '../dashboard/_components/Card';
import Column from '../dashboard/_components/Column';
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
      <Column />
    </div>
  );
}
