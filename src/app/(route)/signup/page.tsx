'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Input from '@/app/_components/Input';
import LoginButton from '@/app/_components/Button/LoginButton/LoginButton';
import {
  isValidCheckPassword,
  isValidEmail,
  isValidNickname,
  isValidPassword,
} from '@/app/_utils/validateUtils';
import { useOutsideClick } from '@/app/_hooks/useOutsideClick';
import useAppDispatch from '@/app/_hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { registerActions, userResponse } from '@/app/_slice/registerSlice';
import { useRouter } from 'next/navigation';
import ErrorToast from '@/app/_components/_toast/_errorToast/ErrorToast';
import styles from './page.module.css';

const SignUp = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nicknameRef = useRef<HTMLInputElement>(null);
  const checkPasswordRef = useRef<HTMLInputElement>(null);
  const formData = useRef({
    email: '',
    password: '',
    nickname: '',
    checkPassword: '',
  });

  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [checkPasswordIsValid, setCheckPasswordIsValid] = useState(false);
  const [nicknameIsValid, setNicknameIsValid] = useState(false);
  const [signupButtonActive, setSignupButtonActive] = useState(true);
  const [errorToastState, setErrorToastState] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const dispatch = useAppDispatch();
  const signup = useSelector(userResponse);
  const router = useRouter();

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    formData.current.email = e.currentTarget.value.trimEnd();
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    formData.current.password = e.currentTarget.value;
  };

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    formData.current.nickname = e.currentTarget.value.trimEnd();
  };

  const onChangeCheckPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    formData.current.checkPassword = e.currentTarget.value;
  };

  const submitFormData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email } = formData.current;
    const { password } = formData.current;
    const { nickname } = formData.current;
    const { checkPassword } = formData.current;
    let check = true;

    if (isValidEmail(email)) {
      setEmailIsValid(true);
      check = false;
    }
    if (isValidPassword(password)) {
      setPasswordIsValid(true);
      check = false;
    }
    if (isValidNickname(nickname)) {
      setNicknameIsValid(true);
      check = false;
    }
    if (isValidCheckPassword(password, checkPassword)) {
      setCheckPasswordIsValid(true);
      check = false;
    }

    if (check) {
      dispatch(
        registerActions.asynchFetchSignUp({
          email,
          nickname,
          password,
        }),
      );

      setSignupButtonActive(false);
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

  useOutsideClick(checkPasswordRef, () => {
    const { password } = formData.current;
    const { checkPassword } = formData.current;

    setCheckPasswordIsValid(isValidCheckPassword(password, checkPassword));
  });

  useOutsideClick(nicknameRef, () => {
    const { nickname } = formData.current;

    if (nickname === '') return;

    setNicknameIsValid(isValidNickname(nickname));
  });

  useEffect(() => {
    if (signup.status === 201) {
      localStorage.setItem('signupSuccess', 'true');
      dispatch(registerActions.resetData());
      router.push('/login');
    } else if (signup.status === 409) {
      setToastMessage('이미 사용중인 이메일입니다.');
      if (!errorToastState) {
        setErrorToastState(true);
      }
      if (!signupButtonActive) {
        setSignupButtonActive(true);
      }
    } else if (signup.status === 400) {
      setToastMessage('이메일 형식으로 작성해주세요.');
      if (!errorToastState) {
        setErrorToastState(true);
      }
      if (!signupButtonActive) {
        setSignupButtonActive(true);
      }
    }
  }, [signup]);

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
          <div className={styles.logoTextBox}>첫 방문을 환영합니다!</div>
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
              errorMessage="이메일 형식에 맞춰 입력해주세요."
              onChange={onChangeEmail}
              errorState={emailIsValid}
            />
            <Input
              inputId="nickname"
              inputWidth="100%"
              inputType="text"
              inputName="닉네임"
              inputRef={nicknameRef}
              placeholder="닉네임을 입력해 주세요"
              errorMessage="10글자 이하로 입력해주세요."
              onChange={onChangeNickname}
              errorState={nicknameIsValid}
            />
            <Input
              inputId="password"
              inputWidth="100%"
              inputType="password"
              inputName="비밀번호"
              inputRef={passwordRef}
              placeholder="비밀번호를 입력해 주세요"
              errorMessage="8자 이상 작성해주세요."
              onChange={onChangePassword}
              errorState={passwordIsValid}
            />
            <Input
              inputId="checkPassword"
              inputWidth="100%"
              inputType="password"
              inputName="비밀번호 확인"
              inputRef={checkPasswordRef}
              placeholder="비밀번호를 한번 더 입력해 주세요"
              errorMessage="비밀번호가 일치하지 않습니다."
              onChange={onChangeCheckPassword}
              errorState={checkPasswordIsValid}
            />
          </div>
          <LoginButton isActive={signupButtonActive} value="가입하기" />
        </form>
        <div className={styles.signUpWrapper}>
          <div>이미 가입하셨나요?</div>
          <div className={styles.signUpLink}>
            <Link href="/login">로그인하기</Link>
          </div>
        </div>
      </div>
      <ErrorToast
        errorMessage={toastMessage}
        errorState={errorToastState}
        onClose={() => setErrorToastState(false)}
      />
    </>
  );
};

export default SignUp;
