import Input from "@/app/_components/Input";
import DashboardListNavBar from "@/app/_components/_navbar/_dashboardNavbar/_dashboardListType/DashboardListNavBar";
import UserIcon from "@/app/_components/UserIcon";
import DashboardNavBar from "@/app/_components/_navbar/_dashboardNavbar/_dashboardType/DashboardNavBar";

export default function Home() {
  const membersInfo = {
    members: [{
      id:1,
      userId: 1,
      email: '1',
      nickname: '비',
      profileImageUrl: null,
      createdAt: '1',
      updatedAt: '1',
      isOwner: true
    }, {
      id:1,
      userId: 1,
      email: '1',
      nickname: '김',
      profileImageUrl: null,
      createdAt: '1',
      updatedAt: '1',
      isOwner: true
    },
      {
        id:1,
        userId: 1,
        email: '1',
        nickname: '박',
        profileImageUrl: null,
        createdAt: '1',
        updatedAt: '1',
        isOwner: true
      },
      {
        id:1,
        userId: 1,
        email: '1',
        nickname: '소',
        profileImageUrl: null,
        createdAt: '1',
        updatedAt: '1',
        isOwner: true
      },{
        id:1,
        userId: 1,
        email: '1',
        nickname: 'Juliet',
        profileImageUrl: null,
        createdAt: '1',
        updatedAt: '1',
        isOwner: true
      }],

    totalCount: 4
  }

  return <div style={{height: '1024px'}}>
    <DashboardListNavBar nickname={'홍재훈'}></DashboardListNavBar>
    <DashboardNavBar dashboardTitle='내꺼' createdByMe={true} membersInfo={membersInfo} nickname={'홍재훈'}></DashboardNavBar>
  </div>;
}
