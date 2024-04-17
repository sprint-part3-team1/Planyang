export interface InputProps {
  readonly inputName: string;
  readonly inputType: 'text' | 'password' | 'calendar' | 'tag';
  readonly inputWidth: number;
  readonly errorMessage?: string | null;

  errorState?: boolean;
  placeholder?: string;
}
