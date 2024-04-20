import {MemberListDto} from "@/app/_types/_dto/MemberListDto";

export interface DashboardNavBarProps {
    membersInfo: MemberListDto;
    nickname: string;
    createdByMe: boolean;
    dashboardTitle: string;
    profileImageUrl?: string | null;
}