import DashboardListNavBar from '@/app/_components/_navbar/_dashboardNavbar/_dashboardListType/DashboardListNavBar';
import AddDashBoardButton from '@/app/_components/Button/AddDashBoardButton/AddDashBoardButton';
import SideMenu from './_components/SideMenu';
import styles from './page.module.css';
import DashInvite from './_components/DashInvite';

export default function MyDashBoard() {
  return (
    <div>
      <DashboardListNavBar nickname="박기범" />
      <SideMenu />
      <div className={styles.content}>
        <AddDashBoardButton />
        <DashInvite />
      </div>
    </div>
  );
}
