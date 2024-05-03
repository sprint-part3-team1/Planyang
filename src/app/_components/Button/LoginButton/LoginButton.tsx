import styles from './LoginButton.module.css';

const LoginButton = ({ isActive = false, value = ''} : {isActive: boolean; value: string;}) => {
  return (
    <button
      type="submit"
      className={
        isActive ? styles.loginButtonIsActive : styles.loginButtonNotActive
      }
      disabled={!isActive}
    >
        {value}
    </button>
  );
};

export default LoginButton;
