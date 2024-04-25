'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './page.module.css';
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

const LoginPage = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const formData = useRef({ email: '', password: '' });

  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [errorToastState, setErrorToastState] = useState(false);
  const [loginButtonActive, setLoginButtonActive] = useState(true);

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

    const email = formData.current.email;
    const password = formData.current.password;
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
    const email = formData.current.email;

    if (email === '') return;

    setEmailIsValid(isValidEmail(email));
  });

  useOutsideClick(passwordRef, () => {
    const password = formData.current.password;
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
      if (!errorToastState) {
        setErrorToastState(true);
      }
      if (!loginButtonActive) {
        setLoginButtonActive(true);
      }
      console.log(login);
    }
  }, [login]);

  return (
    <>
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
          <LoginButton isActive={loginButtonActive} />
        </form>
        <div className={styles.signUpWrapper}>
          <div>회원이 아니시라면?</div>
          <div className={styles.signUpLink}>
            <Link href="/signup">회원가입하기</Link>
          </div>
        </div>
      </div>
      <ErrorToast
        errorMessage="아이디 또는 비밀번호가 유효하지 않습니다."
        errorState={errorToastState}
        onClose={() => setErrorToastState(false)}
      ></ErrorToast>
    </>
  );
};

export default LoginPage;
