import TableMember from '@/app/(route)/mydashboard/_components/TableMember';
import styles from './page.module.css';

export default function Main() {
  return (
    <div className={styles.container}>
      <br />
      <TableMember />
    </div>
  );
}
