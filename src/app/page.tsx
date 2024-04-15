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
  return (
    <div>
      <button
        type="button"
        onClick={() =>
          handleSignUp('koe123123123@naver.com', '플래냥테스트계정', 'AS123456')
        }
      >
        회원가입
      </button>
      <button
        type="button"
        onClick={() => handleSignIn('koe123123123@naver.com', 'AS123456')}
      >
        로그인
      </button>
    </div>
  );
}
