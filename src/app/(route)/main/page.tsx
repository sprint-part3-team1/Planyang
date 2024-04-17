import TableMember from '@/app/(route)/mydashboard/_components/TableMember';
import styles from './page.module.css';
import TableInvite from '../mydashboard/_components/TableInvite';

export default function Main() {
  return (
    <div className={styles.container}>
      <br />
      <TableMember />
      <br />
      <br />
      <TableInvite />
    </div>
  );
}
