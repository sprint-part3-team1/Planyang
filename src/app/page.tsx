'use client';

import useAppSelector from './_hooks/useAppSelector';
import useAppDispatch from './_hooks/useAppDispatch';
import { userData, userActions } from './_slice/userDataSlice';

export default function Home() {
  const a: string = 'bb';

  const userInfo = useAppSelector(userData);
  const dispatch = useAppDispatch();

  const handleSignUp = (email: string, nickname: string, password: string) => {
    dispatch(
      userActions.asynchFetchSignUp({
        email,
        nickname,
        password,
      }),
    );
  };
  return (
    <div>
      <button
        type="button"
        onClick={() =>
          handleSignUp('testPlanyang@naver.com', '플래냥테스트계정', 'AS123456')
        }
      >
        회원가입
      </button>
    </div>
  );
}
