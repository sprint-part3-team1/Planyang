export interface InputProps {
    readonly inputName: string;
    readonly inputType: 'text' | 'password';
    readonly inputWidth: number;
    readonly errorMessage?: string | null;

    errorState: boolean;
}