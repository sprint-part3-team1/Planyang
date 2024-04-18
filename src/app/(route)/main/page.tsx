import TableMember from '@/app/(route)/mydashboard/_components/TableMember';
import styles from './page.module.css';
import TableInvite from '../mydashboard/_components/TableInvite';
import DashInvite from '../mydashboard/_components/DashInvite';

export default function Main() {
  return (
    <div className={styles.container}>
      <br />
      <DashInvite />
      <br />
    </div>
  );
}
