import React, { useState } from "react";
import styles from "./Login.module.css"; // 스타일을 적용하기 위한 CSS 모듈을 불러옵니다.

const Login = () => {
  const [username, setUsername] = useState(""); // 사용자의 아이디 상태
  const [password, setPassword] = useState(""); // 사용자의 비밀번호 상태

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    // 실제 로그인 처리를 수행할 함수
    console.log("Logging in with username:", username);
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Login</h2>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={handleUsernameChange} />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
