import React, {ChangeEventHandler} from "react";

export interface InputProps {
  readonly inputId: string;
  readonly inputName: string;
  readonly inputType: 'text' | 'password' | 'calendar' | 'tag';
  readonly inputWidth: number | '100%';
  readonly inputRef: React.MutableRefObject<any>;
  readonly errorMessage?: string | null;
  readonly onChange?: ChangeEventHandler<HTMLInputElement>;

  errorState?: boolean;
  placeholder?: string;
}
