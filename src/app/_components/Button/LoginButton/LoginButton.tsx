import styles from './LoginButton.module.css';

const LoginButton = ({ isActive = false, value = ''}) => {
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
