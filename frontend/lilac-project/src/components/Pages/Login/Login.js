import React, { useState } from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    console.log("Logging in with username:", username);
  };

  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.loginTitle}>Lilac Studio</h1>
      <div className={styles.inputFieldContainer}>
        <div>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="이메일"
            className={styles.inputField}
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="비밀번호"
            className={styles.inputField}
          />
        </div>
      </div>
      <button onClick={handleLogin} className={styles.loginButton}>
        로그인
      </button>
      <div className={styles.snsLogin}>
        <button className={styles.snsButton}>네이버</button>
        <button className={styles.snsButton}>구글</button>
        <button className={styles.snsButton}>애플</button>
      </div>
      <div className={styles.signup}>
        <a href="#" className={styles.forgotLinks}>
          아이디 찾기
        </a>
        <div className={styles.separator} />
        <a href="#" className={styles.forgotLinks}>
          비밀번호 찾기
        </a>
        <div className={styles.separator} />
        <Link to="/signup" className={styles.signupLink}>
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default Login;
