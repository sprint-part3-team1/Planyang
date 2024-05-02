import { MemberListDto } from '@/app/_types/_dto/MemberListDto';
import { RegisterStateType } from './_redux/_state/reduxState';

export interface DashboardNavBarProps {
  membersInfo?: MemberListDto;
  createdByMe: boolean | undefined;
  dashboardTitle: string | undefined;
  userInfo: RegisterStateType;
  boardId: string | undefined;
}
