import { MemberListDto } from '@/app/_types/_dto/MemberListDto';

export interface DashboardNavBarProps {
  membersInfo?: MemberListDto;

  createdByMe: boolean;
  dashboardTitle: string;
  boardId: string;
  dashboardId: number;
}
