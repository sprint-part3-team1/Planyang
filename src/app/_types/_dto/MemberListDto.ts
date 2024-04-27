export interface MemberListDto {
  readonly totalCount: number;
}

interface Member {
  readonly id: number;
  readonly userId: number;
  readonly email: string;
  readonly nickname: string;
  readonly profileImageUrl: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly isOwner: boolean;
}
