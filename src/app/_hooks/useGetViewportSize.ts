import { useState, useEffect } from 'react';
import VIEWPORT_TYPES from '../constants/viewPortTypes';

const useGetViewportSize = () => {
  const [viewPortType, setViewPortType] = useState(VIEWPORT_TYPES.deskTop);

  const viewPortResizeHandler = () => {
    const viewportWidth = window.innerWidth;

    if (viewportWidth > 767 && viewportWidth < 1023) {
      setViewPortType(VIEWPORT_TYPES.tablet);
    } else if (viewportWidth <= 767) {
      setViewPortType(VIEWPORT_TYPES.mobile);
    } else {
      setViewPortType(VIEWPORT_TYPES.deskTop);
    }
  };

  useEffect(() => viewPortResizeHandler(), []);

  useEffect(() => {
    window.addEventListener('resize', viewPortResizeHandler);

    return () => {
      window.removeEventListener('resize', viewPortResizeHandler);
    };
  }, []);

  return viewPortType;
};

export default useGetViewportSize;
