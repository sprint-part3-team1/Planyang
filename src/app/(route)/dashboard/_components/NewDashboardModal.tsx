import CheckCancelButton from '@/app/_components/modal/CheckCancelButton';

import styles from './NewDashboardModal.module.css';

function NewDashboardModal() {
  const title = '새로운 대시보드';
  const colors = ['green', 'purple', 'orange', 'blue', 'pink'];

  return (
    <div className={styles.container}>
      <p id={styles.title}>{title}</p>
      <p id={styles.dashBaordNameinputTitle}>대시보드 이름</p>
      <input className={styles.dashboardNameInput} />
      <div className={styles.colorEclipseContainer}>
        {colors.map((color) => {
          return (
            <div
              key={color}
              className={`${styles.colorEclipse} ${styles[color]}`}
            />
          );
        })}
      </div>
      <CheckCancelButton />
    </div>
  );
}
export default NewDashboardModal;
