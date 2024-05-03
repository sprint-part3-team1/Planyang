'use client';

import React from 'react';

interface Props {
  error: Error;
  reset: () => void;
}

const ErrorPage = ({ error, reset }: Props) => {
  console.log('Error: ', error);

  return (
    <>
      <div>예상치 못한 오류가 발생했습니다.</div>
      <button type="button" className="btn" onClick={() => reset()}>
        Retry
      </button>
    </>
  );
};

export default ErrorPage;
