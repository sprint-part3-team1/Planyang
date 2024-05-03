'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Input from '@/app/_components/Input';
import { useOutsideClick } from '@/app/_hooks/useOutsideClick';
import LoginButton from '@/app/_components/Button/LoginButton/LoginButton';
import { isValidEmail, isValidPassword } from '@/app/_utils/validateUtils';
import { loginActions, loginData } from '@/app/_slice/loginSlice';
import useAppDispatch from '@/app/_hooks/useAppDispatch';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import ErrorToast from '@/app/_components/_toast/_errorToast/ErrorToast';
import SuccessToast from '@/app/_components/_toast/_successToast/SuccessToast';
import styles from './page.module.css';
import Head from 'next/head';

const LoginPage = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const formData = useRef({ email: '', password: '' });

  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [errorToastState, setErrorToastState] = useState(false);
  const [successToastState, setSuccessToastState] = useState(false); // 이 부분을 수정했습니다.
  const [loginButtonActive, setLoginButtonActive] = useState(true);
  const [toastMessage, setToastMessage] = useState('');

  const dispatch = useAppDispatch();
  const login = useSelector(loginData);
  const router = useRouter();

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    formData.current.email = e.currentTarget.value.trimEnd();
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    formData.current.password = e.currentTarget.value;
  };

  const submitFormData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email } = formData.current;
    const { password } = formData.current;
    let check = true;

    if (isValidEmail(email)) {
      setEmailIsValid(true);
      check = false;
    }
    if (isValidPassword(password)) {
      setPasswordIsValid(true);
      check = false;
    }

    if (check) {
      dispatch(
        loginActions.asynchFetchSignIn({
          email,
          password,
        }),
      );

      setLoginButtonActive(false);
    }
  };

  useOutsideClick(emailRef, () => {
    const { email } = formData.current;

    if (email === '') return;

    setEmailIsValid(isValidEmail(email));
  });

  useOutsideClick(passwordRef, () => {
    const { password } = formData.current;
    if (password === '') return;

    if (password.length >= 8) {
      setPasswordIsValid(false);
    } else {
      setPasswordIsValid(true);
    }
  });

  useEffect(() => {
    if (login.status === 201) {
      router.push('/mydashboard');
    } else if (login.status === 404) {
      setToastMessage('존재하지 않는 회원입니다.');
      if (!errorToastState) {
        setErrorToastState(true);
      }
      if (!loginButtonActive) {
        setLoginButtonActive(true);
      }
    } else if (login.status === 400) {
      setToastMessage('비밀번호가 일치하지 않습니다.');
      if (!errorToastState) {
        setErrorToastState(true);
      }
      if (!loginButtonActive) {
        setLoginButtonActive(true);
      }
    }
  }, [login]);

  return (
    <div>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const signUpSuccess = localStorage.getItem('signupSuccess');
              const successToastState = signUpSuccess === 'true';
            `,
          }}
        />
      </Head>
      <div className={styles.entireWrapper}>
        <div className={styles.logoWrapper}>
          <Link href="/">
            <Image
              src="/assets/images/planyang.png"
              alt="logo"
              width={230}
              height={270}
            />
          </Link>
          <div className={styles.logoTextBox}>오늘도 만나서 반가워요!</div>
        </div>
        <form className={styles.entireFormWrapper} onSubmit={submitFormData}>
          <div className={styles.inputFormWrapper}>
            <Input
              inputId="email"
              inputWidth="100%"
              inputType="text"
              inputName="이메일"
              inputRef={emailRef}
              placeholder="이메일을 입력해 주세요"
              errorState={emailIsValid}
              errorMessage="이메일 형식에 맞춰 입력해주세요."
              onChange={onChangeEmail}
            />
            <Input
              inputId="password"
              inputWidth="100%"
              inputType="password"
              inputName="비밀번호"
              inputRef={passwordRef}
              placeholder="비밀번호를 입력해 주세요"
              onChange={onChangePassword}
              errorMessage="8자 이상 작성해주세요."
              errorState={passwordIsValid}
            />
          </div>
          <LoginButton isActive={loginButtonActive} value="로그인" />
        </form>
        <div className={styles.signUpWrapper}>
          <div>회원이 아니시라면?</div>
          <div className={styles.signUpLink}>
            <Link href="/signup">회원가입하기</Link>
          </div>
        </div>
      </div>
      <ErrorToast
        errorMessage={toastMessage}
        errorState={errorToastState && !successToastState}
        onClose={() => setErrorToastState(false)}
      />
      <SuccessToast
        successMessage="회원가입이 완료되었습니다."
        successState={successToastState}
        onClose={() => {
          setErrorToastState(false);
          setSuccessToastState(false);
        }}
      />
    </div>
  );
};

export default LoginPage;
