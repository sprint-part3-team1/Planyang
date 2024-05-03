'use client';

import { useEffect, useState } from 'react';
import Router from 'next/router';

const useLoading = () => {
  const [nowLoading, setNowLoading] = useState<boolean>(false);
  useEffect(() => {
    const start = () => {
      setNowLoading(false);
    };
    const end = () => {
      setNowLoading(false);
    };
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  return nowLoading;
};

export default useLoading;
