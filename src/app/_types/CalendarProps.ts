import React from 'react';

export interface CalendarProps {
  onValueChange: Function;
  date: Date;
  reference: React.MutableRefObject<any>;
}
