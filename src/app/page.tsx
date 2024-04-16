'use client';

import useAppSelector from './_hooks/useAppSelector';
import useAppDispatch from './_hooks/useAppDispatch';
import { registerData, registerActions } from './_slice/registerSlice';
import { loginData, loginActions } from './_slice/loginSlice';

export default function Home() {
  const registerInfo = useAppSelector(registerData);
  const loginInfo = useAppSelector(loginData);
  const dispatch = useAppDispatch();
  console.log(registerInfo);
  console.log(loginInfo);

  const handleSignUp = (email: string, nickname: string, password: string) => {
    dispatch(
      registerActions.asynchFetchSignUp({
        email,
        nickname,
        password,
      }),
    );
  };

  const handleSignIn = (email: string, password: string) => {
    dispatch(
      loginActions.asynchFetchSignIn({
        email,
        password,
      }),
    );
  };

  const handleChangePassword = (password: string, newPassword: string) => {
    dispatch(
      registerActions.asynchFetchChangePassword({
        password,
        newPassword,
      }),
    );
  };
  return (
    <div>
      <button
        type="button"
        onClick={() =>
          handleSignUp('ko1231235@naver.com', '플래냥테스트계정', 'AS123456')
        }
      >
        회원가입
      </button>
      <button
        type="button"
        onClick={() => handleSignIn('ko1231235@naver.com', 'AS1234567')}
      >
        로그인
      </button>
      <button
        type="button"
        onClick={() => handleChangePassword('AS123456', 'AS1234567')}
      >
        비밀번호 변경
      </button>
    </div>
  );
}
