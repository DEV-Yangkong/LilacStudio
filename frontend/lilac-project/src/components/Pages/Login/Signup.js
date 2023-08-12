import React, { useState, useEffect } from "react";
import styles from "./Signup.module.css";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [csrftoken, setCsrftoken] = useState("");

  useEffect(() => {
    async function fetchCsrfToken() {
      try {
        const response = await axios.get("http://localhost:8000/csrf/");
        const csrfToken = response.data.csrfToken;
        setCsrftoken(csrfToken);
      } catch (error) {
        console.error("Error fetching CSRF token:", error);
      }
    }
    fetchCsrfToken();
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const apiUrl = "http://localhost:8000"; // 백엔드 서버 주소
  const endpoint = "/admin/auth/user/"; // API 엔드포인트

  const handleSignup = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}${endpoint}`,
        {
          name,
          email,
          password,
          phoneNumber,
        },
        {
          headers: {
            "X-CSRFToken": csrftoken,
          },
          withCredentials: true, // credentials 설정 추가
        }
      );
      console.log("Signup successful:", response.data);
      // 여기서 리다이렉션 등 원하는 동작을 수행할 수 있습니다.
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className={styles.signupContainer}>
      <h1 className={styles.signupTitle}>Lilac Studio</h1>
      <div className={styles.inputFieldContainer}>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="이름"
          className={styles.inputField}
        />
        <input
          type="text"
          value={email}
          onChange={handleEmailChange}
          placeholder="이메일"
          className={styles.inputField}
        />
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="비밀번호"
          className={styles.inputField}
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          placeholder="비밀번호 확인"
          className={styles.inputField}
        />
        <input
          type="number"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          placeholder="휴대폰 번호"
          className={styles.inputField}
        />
      </div>
      <button onClick={handleSignup} className={styles.signupButton}>
        이메일로 가입
      </button>
      <div className={styles.snsLogin}>
        <button className={styles.snsButton}>네이버</button>
        <button className={styles.snsButton}>구글</button>
        <button className={styles.snsButton}>애플</button>
      </div>
    </div>
  );
};

export default Signup;
