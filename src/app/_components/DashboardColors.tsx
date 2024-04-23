import DASHBOARD_COLORS from '../constants/dashboardColorConstant';
import CheckIcon from '../../../public/assets/icons/checkIcon';
import styles from './DashboardColors.module.css';
import { DashboradColorsPropsType } from '../_types/dashboardColorsProps';

const DashboardColors = ({
  dashboardColor,
  setDashboardColor,
}: DashboradColorsPropsType) => {
  return (
    <div className={styles.colorEclipseContainer}>
      {DASHBOARD_COLORS.map((color) => {
        return (
          <button
            key={color}
            className={`${styles.colorEclipse} ${styles[color]}`}
            onClick={() => setDashboardColor(color)}
            type="button"
          >
            {dashboardColor === color && <CheckIcon fill="white" />}
          </button>
        );
      })}
    </div>
  );
};

export default DashboardColors;
