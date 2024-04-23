import React, { SetStateAction } from 'react';

export type DashboradColorsPropsType = {
  dashboardColor: string;
  setDashboardColor: React.Dispatch<SetStateAction<string>>;
};
