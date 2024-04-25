'use client';

import useAppDispatch from '@/app/_hooks/useAppDispatch';
import useAppSelector from '@/app/_hooks/useAppSelector';
import { registerActions, userResponse } from '@/app/_slice/registerSlice';
import { loginData, loginActions } from '@/app/_slice/loginSlice';
import { dashBoardActions, dashBoardData } from '@/app/_slice/dashBoardSlice';
import {
  invitationActions,
  invitationData,
} from '@/app/_slice/invitationSlice';
import {
  receivedInvitationActions,
  receivedInvitationData,
} from '@/app/_slice/receivedInvitationsSlice';
import { memberActions, memberData } from '@/app/_slice/memberSlice';
import { columnActions, columnData } from '@/app/_slice/columnSlice';
import { cardActions, cardData } from '@/app/_slice/cardSlice';

// 테스트 계정1 planyang1@test.com AS650103
// 테스트 계정2 planyang2@test.com AS650103

const TestPage = () => {
  const dispatch = useAppDispatch();

  const loginDatas = useAppSelector(loginData);

  // 현재 로그인한 유저의 정보가 담긴 데이터 입니다 getMyInformation 함수를 통해 데이터를 불러옵니다
  const userData = useAppSelector(userResponse);
  console.log(loginDatas);

  // 대시보드 데이터 입니다
  const dashBoardDatas = useAppSelector(dashBoardData);

  // 내가 초대를 보낸 목록의 데이터입니다
  const invitationDatas = useAppSelector(invitationData);

  // 내가 초대를 받은 목록의 데이터입니다
  const receivedInvitationDatas = useAppSelector(receivedInvitationData);

  // 대시보드 멤버 데이터 입니다.
  const memberDatas = useAppSelector(memberData);

  // 칼럼 데이터 입니다.
  const columnDatas = useAppSelector(columnData);

  // 칼럼 내의 카드 데이터 입니다.
  const cardDatas = useAppSelector(cardData);

  // 회원가입 함수 파라미터로 이메일, 닉네임, 패스워드를 받습니다 회원가입이 성공하면 유저데이터에 회원가입을한 유저의 정보가 저장됩니다
  const submitRegistration = (
    email: string,
    nickname: string,
    password: string,
  ) => {
    dispatch(
      registerActions.asynchFetchSignUp({
        email,
        nickname,
        password,
      }),
    );
  };

  // 로그인 함수입니다 파라미터로 이메일 ,비밀번호를 받습니다 로그인에 성공하면 엑세스 토큰을 로컬 스토리지에 저장합니다
  const submitLogin = (email: string, password: string) => {
    dispatch(
      loginActions.asynchFetchSignIn({
        email,
        password,
      }),
    );
  };

  // 비밀번호 변경함수 파라미터로 현재 비밀번호값, 변경할 비밀번호값을 문자열로 받습니다
  const changePassword = (password: string, newPassword: string) => {
    dispatch(
      registerActions.asynchFetchChangePassword({
        password,
        newPassword,
      }),
    );
  };

  // 현재 로그인중인 유저의 정보를 가져옵니다
  const getMyInformation = () => {
    dispatch(registerActions.asynchFetchgetUserInfo());
  };

  // 유저의 정보를 수정할수 있는 함수입니다 파라미터로 닉네임과 프로필 사진을 받습니다 (현재 프로필 이미지는 null값으로 되있음)
  const updateMyInformation = (
    nickname: string,
    profileImageUrl: string | null,
  ) => {
    dispatch(
      registerActions.asynchFetchUpdateInformation({
        nickname,
        profileImageUrl,
      }),
    );
  };

  // 내 대시보드 목록을 모두 불러오는 함수입니다 api 호출에 성공하면 데이터가 대시보드 데이터에 담깁니다
  const getMyDashBoard = () => {
    dispatch(dashBoardActions.asynchFetchGetDashBoard());
  };

  // 대시보드를 만드는 함수입니다 color로 hex 코드 값을 받습니다
  const createDashBoard = (title: string, color: string) => {
    dispatch(
      dashBoardActions.asynchFetchCreateDashBoard({
        title,
        color,
      }),
    );
  };

  // 대시보드를 삭제하는 함수입니다 파라미터로 대시보드의 ID값을 받고 대시보드중 일치하는 ID값의 대시보드를 삭제합니다
  const deleteDashBoard = (dashBoardId: number) => {
    dispatch(
      dashBoardActions.asynchFetchDeleteDashBoard({
        dashBoardId,
      }),
    );
  };

  // 대시보드 내용을 수정하는 함수입니다 파라미터로 해당 대시보드 id 바꿀 타이틀 , hex코드 값을 받습니다
  const updateDashBoard = (
    dashBoardId: number,
    title: string,
    color: string,
  ) => {
    dispatch(
      dashBoardActions.asyncFetchUpdateDashBoard({
        dashBoardId,
        title,
        color,
      }),
    );
  };

  // 내가 보낸 초대 목록의 데이터를 가져오는 함수입니다
  const getMyInvitationList = (dashBoardId: number) => {
    dispatch(invitationActions.asynchGetMyInvitation(dashBoardId));
  };

  // 유저 이메일과 대시보드 id를 적어 그 이메일 유저에게 해당 대시보드로 초대합니다
  const inviteUserToDashBoard = (email: string, dashBoardId: number) => {
    dispatch(
      invitationActions.asynchFetchinviteUserToDashboard({
        email,
        dashBoardId,
      }),
    );
  };

  // 해당 대시보드값과 일치하는 초대값의id 초대를 취소합니다(삭제)
  const cancleInvitation = (dashBoardId: number, invitationId: number) => {
    dispatch(
      invitationActions.asynchFetchDeleteInvited({
        dashBoardId,
        invitationId,
      }),
    );
  };

  // 내가 받은 초대목록을 가져옵니다 api호출이 성공하면 receivedInvitations에 response가 리턴됩니다
  const getReceivedInvitation = () => {
    dispatch(receivedInvitationActions.asyncGetReceivedInvitations());
  };

  // 초대를 수락합니다 해당 초대목록이 state에서 삭제 됩니다
  const acceptInvite = (invitationId: number) => {
    dispatch(
      receivedInvitationActions.asyncAcceptInvite({
        invitationId,
        isAccept: true,
      }),
    );
  };

  // 초대를 거절합니다 해당 초대목록이 state에서 삭제 됩니다
  const rejectInvite = (invitationId: number) => {
    dispatch(
      receivedInvitationActions.asyncAcceptInvite({
        invitationId,
        isAccept: false,
      }),
    );
  };

  // 대시보드 멤버 목록을 조회합니다
  const getMemberList = (dashboardId: number) => {
    dispatch(
      memberActions.asyncGetMembers({
        dashboardId,
      }),
    );
  };

  // 대시보드 멤버를 삭제합니다
  const deleteMember = (memberId: number) => {
    dispatch(
      memberActions.asyncDeleteMember({
        memberId,
      }),
    );
  };

  // 칼럼 제목과 대시보드 Id를 prop으로 받아서 해당 대시보드 id에 칼럼을 생성합니다
  const createColumn = (title: string, dashboardId: number) => {
    dispatch(
      columnActions.asyncFetchCreateColumn({
        title,
        dashboardId,
      }),
    );
  };

  // 해당 대시보드에 있는 칼럼들을 조회합니다
  const getColumn = (dashboardId: number) => {
    dispatch(
      columnActions.asyncFetchGetColumn({
        dashboardId,
      }),
    );
  };

  // 칼럼의 제목을 수정합니다
  const updateColumn = (columnId: number, title: string) => {
    dispatch(
      columnActions.asyncFetchPutColumn({
        columnId,
        title,
      }),
    );
  };

  // 칼럼을 삭제합니다
  const deleteColumn = (columnId: number) => {
    dispatch(
      columnActions.asyncFetchDeleteColumn({
        columnId,
      }),
    );
  };

  // dueDate, tags, imageUrl에 값을 null로 해도 괜찮습니다
  const createCard = (
    assigneeUserId: number,
    dashboardId: number,
    columnId: number,
    title: string,
    description: string,
    dueDate: string,
    tags: [string],
    imageUrl: string,
  ) => {
    dispatch(
      cardActions.asyncFetchCreateCard({
        assigneeUserId,
        dashboardId,
        columnId,
        title,
        description,
        dueDate,
        tags,
        imageUrl,
      }),
    );
  };

  // 해당 컬럼의 카드 목록을 조회합니다
  const getCardList = (columnId: number) => {
    dispatch(cardActions.asyncFetchGetCards({ columnId }));
  };

  // 카드를 수정합니다
  const updateCard = (
    columnId: number,
    id: number, // assigneeUserId
    cardId: number,
    title: string,
    description: string,
    dueDate: string,
    tags: [string],
    imageUrl: string,
  ) => {
    dispatch(
      cardActions.asyncFetchPutCard({
        columnId,
        assignee: { id },
        id: cardId,
        title,
        description,
        dueDate,
        tags,
        imageUrl,
      }),
    );
  };

  // 카드를 조회합니다
  const getCard = (cardId: number) => {
    dispatch(cardActions.asyncFetchGetCard({ cardId }));
  };

  // 카드를 삭제합니다
  const deleteCard = (cardId: number) => {
    dispatch(cardActions.asyncFetchDeleteCard({ cardId }));
  };

  return (
    <div>
      <h1>이 페이지는 API 호출을 실험하기 위한 페이지 입니다</h1>
      <br />
      <br />
      <br />
      <div>
        <h2>Auth</h2>

        <button
          type="button"
          onClick={() => {
            submitRegistration('min@test.com', '민정민', 'AS123456');
          }}
        >
          회원가입
        </button>

        <button
          type="button"
          onClick={() => {
            submitLogin('kkkk@test.com', 'AS123456');
          }}
        >
          로그인
        </button>

        <button
          type="button"
          onClick={() => {
            changePassword('', 'AS123456');
          }}
        >
          비밀번호 변경
        </button>
        {userData.error}
        <button
          type="button"
          onClick={() => {
            getMyInformation();
          }}
        >
          내 정보 가져오기
        </button>
        <button
          type="button"
          onClick={() => {
            updateMyInformation('플래냥3', null);
          }}
        >
          내 정보 수정
        </button>
        <div>현재 접속중인 유저의 이메일 : {userData?.email}</div>
        <div>현재 접속중인 유저의 닉네임 : {userData?.nickname}</div>
      </div>
      <br />
      <br />
      <br />
      <div>
        <h1>DashBoard</h1>
        <button
          type="button"
          onClick={() => {
            getMyDashBoard();
          }}
        >
          내 대시보드 목록 조회
        </button>

        <button
          type="button"
          onClick={() => {
            createDashBoard('테스트 대시보드3', '#E876EA');
          }}
        >
          대시보드 추가하기
        </button>
        <button
          type="button"
          onClick={() => {
            deleteDashBoard(6025);
          }}
        >
          대시보드 삭제하기
        </button>
        <button
          type="button"
          onClick={() => {
            updateDashBoard(6266, '수정된 대시보드1', '#842f54');
          }}
        >
          대시보드 수정하기
        </button>
        <h1>내 대시보드 목록(총 {dashBoardDatas?.totalCount}개)</h1>
        {dashBoardDatas?.dashboards.map((item) => {
          return (
            <div key={item.id} style={{ background: item.color }}>
              <div>대시보드 제목 :{item.title}</div>
              <div>대시보드를 만든 유저 ID{item.userId}</div>
              <div>대시보드 ID : {item.id}</div>
            </div>
          );
        })}
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div>
        <h1>내가 보낸 초대 목록</h1>
        <button
          type="button"
          onClick={() => {
            getMyInvitationList(6362);
          }}
        >
          내가 보낸 초대목록 가져오기
        </button>
        <button
          type="button"
          onClick={() => {
            inviteUserToDashBoard('planyang2@test.com', 6362);
          }}
        >
          유저 대시보드로 초대하기
        </button>
        <button
          type="button"
          onClick={() => {
            cancleInvitation(6025, 5523);
          }}
        >
          초대 취소하기
        </button>

        <h1>내가 보낸 초대 목록 (총 {invitationDatas?.totalCount}개)</h1>
        {invitationDatas?.invitations.map((i) => {
          return (
            <div key={i.id}>
              <div> 초대요청 ID: {i.id}</div>
              <div>초대 받은 사람 닉네임 : {i.invitee.nickname}</div>
            </div>
          );
        })}
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div>
        <h1>내가 받은 초대목록</h1>
        <button
          type="button"
          onClick={() => {
            getReceivedInvitation();
          }}
        >
          내가 받은 초대 목록 불러오기
        </button>

        {receivedInvitationDatas?.invitations.map((i) => {
          return (
            <div key={i.id}>
              <div> 초대요청 ID: {i.id}</div>
              <div>초대 한 사람 닉네임 : {i.inviter.nickname}</div>
              <button
                type="button"
                onClick={() => {
                  acceptInvite(i.id);
                }}
              >
                초대 수락
              </button>
              <button
                onClick={() => {
                  rejectInvite(i.id);
                }}
                type="button"
              >
                초대 거절
              </button>
            </div>
          );
        })}
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div>
        <h1>DashBoard Member</h1>
        <button type="button" onClick={() => getMemberList(6073)}>
          대시보드 멤버 목록 조회
        </button>
        <button type="button" onClick={() => deleteMember(8261)}>
          대시보드 멤버 삭제
        </button>
        <h1>대시보드 멤버 목록 조회 (총 {memberDatas?.totalCount}명)</h1>
        {memberDatas?.members.map((item) => {
          return (
            <div key={item.id}>
              <div>멤버 id: {item.id}</div>
              <div>멤버의 고유 id: {item.userId}</div>
              <div>멤버 닉네임: {item.nickname}</div>
              <div>멤버 이메일: {item.email}</div>
              <br />
            </div>
          );
        })}
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div>
        <h1>Column</h1>
        <button type="button" onClick={() => createColumn('test2', 5936)}>
          칼럼 생성
        </button>
        <button type="button" onClick={() => getColumn(5936)}>
          칼럼 조회
        </button>
        <button type="button" onClick={() => updateColumn(21083, '수정수정')}>
          칼럼 수정
        </button>
        <button type="button" onClick={() => deleteColumn(21083)}>
          칼럼 삭제
        </button>
        <div>
          <h1>내 칼럼 조회 (총 {columnDatas?.data?.length}개)</h1>
          {columnDatas?.data?.map((item) => {
            return (
              <div key={item.id}>
                <div>칼럼 id: {item.id}</div>
                <div>칼럼 title: {item.title}</div>
                <br />
              </div>
            );
          })}
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div>
        <h1>Card</h1>
        <button
          type="button"
          onClick={() =>
            createCard(1673, 5936, 19964, '생성', '설명', '2024-04-17 18:27', [
              '생성',
            ])
          }
        >
          카드 생성
        </button>
        <button type="button" onClick={() => getCardList(19964)}>
          카드 목록 조회
        </button>
        <button
          type="button"
          onClick={() => updateCard(19964, 1673, 4988, '수정수정', '설명 수정')}
        >
          카드 수정
        </button>
        <button type="button" onClick={() => getCard(4988)}>
          카드 조회(콘솔 확인)
        </button>
        <button type="button" onClick={() => deleteCard(4988)}>
          카드 삭제
        </button>
        <div>
          <h1>내 카드 조회 (총 {cardDatas?.totalCount}개)</h1>
          {cardDatas?.cards?.map((item) => {
            return (
              <div key={item.id}>
                <div>카드 id: {item.id}</div>
                <div>카드 title: {item.title}</div>
                <div>카드 설명: {item.description}</div>
                <div>카드 tags: {item.tags}</div>
                <div>카드 생성자: {item.assignee.nickname}</div>
                <br />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TestPage;
