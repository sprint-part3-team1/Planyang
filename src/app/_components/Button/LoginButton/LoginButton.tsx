import styles from './LoginButton.module.css';

const LoginButton = ({ isActive = false }) => {
  return (
    <button
      type="submit"
      className={
        isActive ? styles.loginButtonIsActive : styles.loginButtonNotActive
      }
    >
      로그인
    </button>
  );
};

export default LoginButton;
