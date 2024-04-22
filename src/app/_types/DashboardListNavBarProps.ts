import { DashBoardDetailStateType } from '../_slice/dashBoardDetail';

export interface DashboardListNavBarProps {
  readonly nickname: string;
  readonly profileImageUrl?: string | null;
  boardId: { id: number };
  dashBoardTitle: string;
}
