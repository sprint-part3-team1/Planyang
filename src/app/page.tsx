// 'use client';

// import useAppSelector from './_hooks/useAppSelector';
// import useAppDispatch from './_hooks/useAppDispatch';
// import { registerData, registerActions } from './_slice/registerSlice';
// import { userData, loginActions } from './_slice/loginSlice';
// import { dashBoardData, dashBoardActions } from './_slice/dashBoardSlice';
// import { invitationData, invitationActions } from './_slice/invitationSlice';
// import {
//   receivedInvitationData,
//   receivedInvitationActions,
// } from './_slice/receivedInvitationsSlice';

// export default function Home() {
//   // const registerInfo = useAppSelector(registerData);
//   // const loginInfo = useAppSelector(loginData);
//   const dashBoardInfo = useAppSelector(dashBoardData);
//   const invitationInfo = useAppSelector(invitationData);
//   const receivedInvitationInfo = useAppSelector(receivedInvitationData);
//   const dispatch = useAppDispatch();
//   // console.log(registerInfo);
//   // console.log(loginInfo);
//   // console.log(dashBoardInfo);
//   // console.log(invitationInfo);
//   console.log(receivedInvitationInfo);
//   const handleSignUp = (email: string, nickname: string, password: string) => {
//     dispatch(
//       registerActions.asynchFetchSignUp({
//         email,
//         nickname,
//         password,
//       }),
//     );
//   };

//   const handleSignIn = (email: string, password: string) => {
//     dispatch(
//       loginActions.asynchFetchSignIn({
//         email,
//         password,
//       }),
//     );
//   };

//   const handleChangePassword = (password: string, newPassword: string) => {
//     dispatch(
//       registerActions.asynchFetchChangePassword({
//         password,
//         newPassword,
//       }),
//     );
//   };

//   const getUserInfo = () => {
//     dispatch(registerActions.asynchFetchgetUserInfo());
//   };

//   const updateUserInfo = (nickname: string, profileImageUrl: null) => {
//     dispatch(
//       registerActions.asynchFetchUpdateInformation({
//         nickname,
//         profileImageUrl,
//       }),
//     );
//   };

//   const getDashBoard = () => {
//     dispatch(dashBoardActions.asynchFetchGetDashBoard());
//   };

//   const createDashBoard = (title: string, color: string) => {
//     dispatch(
//       dashBoardActions.asynchFetchCreateDashBoard({
//         title,
//         color,
//       }),
//     );
//   };

//   const getMyInvitationList = () => {
//     dispatch(invitationActions.asynchGetMyInvitation());
//   };
//   const updateDashBoard = (
//     dashBoardId: number,
//     title: string,
//     color: string,
//   ) => {
//     dispatch(
//       dashBoardActions.asyncFetchUpdateDashBoard({
//         dashBoardId,
//         title,
//         color,
//       }),
//     );
//   };

//   const deleteDashBoard = (dashBoardId: number) => {
//     dispatch(
//       dashBoardActions.asynchFetchDeleteDashBoard({
//         dashBoardId,
//       }),
//     );
//   };

//   const invitedUser = (email: string) => {
//     dispatch(
//       invitationActions.asynchFetchinviteUserToDashboard({
//         email,
//       }),
//     );
//   };

//   const deleteInvitedInfo = (dashBoardId: number, invitationId: number) => {
//     dispatch(
//       invitationActions.asynchFetchDeleteInvited({
//         dashBoardId,
//         invitationId,
//       }),
//     );
//   };

//   const getReceivedInvitation = () => {
//     dispatch(receivedInvitationActions.asyncGetReceivedInvitations());
//   };

//   const acceptInvite = (invitationId: number) => {
//     dispatch(
//       receivedInvitationActions.asyncAcceptInvite({
//         invitationId,
//         isAccept: true,
//       }),
//     );
//   };

//   const rejectInvite = (invitationId: number) => {
//     dispatch(
//       receivedInvitationActions.asyncAcceptInvite({
//         invitationId,
//         isAccept: false,
//       }),
//     );
//   };
//   return (
//     <>
//       <div>
//         <h1>유저 정보 api 테스트</h1>
//         <button
//           type="button"
//           onClick={() =>
//             handleSignUp('hong@naver.com', '플래냥재훈테스트', 'AS123456')
//           }
//         >
//           회원가입
//         </button>
//         <button
//           type="button"
//           onClick={() => handleSignIn('jae@naver.com', 'AS123456')}
//         >
//           로그인
//         </button>
//         <button
//           type="button"
//           onClick={() => handleChangePassword('AS123456', 'AS1234567')}
//         >
//           비밀번호 변경
//         </button>
//         <button type="button" onClick={() => getUserInfo()}>
//           회원정보확인
//         </button>
//         <button
//           type="button"
//           onClick={() => updateUserInfo('플리냥1212', null)}
//         >
//           회원정보 변경
//         </button>
//       </div>

//       <div>
//         <h1>대시보드 api 테스트</h1>
//         <button
//           type="button"
//           onClick={() => {
//             getDashBoard();
//           }}
//         >
//           전체 대시보드 가져오기
//         </button>

//         <button
//           type="button"
//           onClick={() => {
//             createDashBoard('대시보드5', '#797979');
//           }}
//         >
//           대시보드 추가하기
//         </button>
//         <button
//           type="button"
//           onClick={() => {
//             updateDashBoard(5970, '수정된 대시보드1', '#123456');
//           }}
//         >
//           대시보드 수정하기
//         </button>
//         <button
//           type="button"
//           onClick={() => {
//             deleteDashBoard(5965);
//           }}
//         >
//           대시보드 삭제하기
//         </button>
//         {dashBoardInfo?.dashboards.map((i) => {
//           return (
//             <>
//               <div key={i.id}>{i.title}</div>
//               <div>{i.color}</div>
//               <div>{i.id}</div>
//             </>
//           );
//         })}
//       </div>
//       <div>
//         <h1>대시보드 초대 관리</h1>
//         <button
//           type="button"
//           onClick={() => {
//             getMyInvitationList();
//           }}
//         >
//           내 초대목록 불러오기
//         </button>
//         <button
//           type="button"
//           onClick={() => {
//             invitedUser('hong@naver.com');
//           }}
//         >
//           유저 초대하기
//         </button>
//         <button
//           type="button"
//           onClick={() => {
//             deleteInvitedInfo(5973, 5512);
//           }}
//         >
//           초대 취소하기
//         </button>
//         {invitationInfo?.invitations.map((item) => {
//           return (
//             <>
//               <div key={item.id}>{item.invitee.nickname}</div>
//               <div>{item.id}</div>
//               <div>{`대시보드 아이디${item.dashboard.id}`}</div>
//             </>
//           );
//         })}
//       </div>

//       <div>
//         <h1>내가 받은 초대목록 관리</h1>
//         <button
//           type="button"
//           onClick={() => {
//             getReceivedInvitation();
//           }}
//         >
//           내가 받은 초대목록 불러오기
//         </button>
//       </div>

//       <div>
//         <button
//           type="button"
//           onClick={() => {
//             acceptInvite(5515);
//           }}
//         >
//           초대 수락
//         </button>
//         <button
//           type="button"
//           onClick={() => {
//             rejectInvite(5514);
//           }}
//         >
//           초대 거절
//         </button>
//       </div>
//     </>
//   );
// }
