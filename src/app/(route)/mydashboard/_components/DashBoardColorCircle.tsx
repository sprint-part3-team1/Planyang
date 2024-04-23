import styles from './DashBoardColorCircle.module.css';

const DashBoardColorCircle = ({ color }: { color: string }) => {
  return (
    <div className={styles.colorCircle} style={{ backgroundColor: color }} />
  );
};

export default DashBoardColorCircle;
