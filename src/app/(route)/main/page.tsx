import AddColumnButton from '@/app/_components/Button/AddColumnButton/AddColumnButton';
import ConfirmButton from '@/app/_components/Button/ConfirmButton/ConfirmButton';
import DeleteButton from '@/app/_components/Button/DeleteButton/DeleteButton';
import LoginButton from '@/app/_components/Button/LoginButton/LoginButton';

export default function Main() {
  return (
    <>
      <LoginButton />
      <ConfirmButton />
      <DeleteButton />
      <AddColumnButton />
    </>
  );
}
