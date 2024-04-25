export interface CardProps {
  nickname: string;
  profileImageUrl?: string;
  title: string;
  tagNameArr: string[];
  date: string;
  image?: string;
  cardInfo: {
    id: number;
    title: string;
    description: string;
    tags: string[];
    dueDate: string;
    assignee: {
      id: number;
      nickname: string;
      profileImageUrl: string;
    };
    imageUrl: string;
    teamId: string;
    dashboardId: number;
    columnId: number;
    createdAt: string;
    updatedAt: string;
  };
}
