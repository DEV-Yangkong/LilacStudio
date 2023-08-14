import React, { useState, useEffect } from "react";
import styles from "./TeamIntroduction.module.css";
import { FaInstagram, FaGithub } from "react-icons/fa";

const TeamIntroduction = () => {
  const memberBackgroundColors = [
    "#fe6d73", // 양예은
    "#a7c957", // 정민근
    "#1768ac", // 고원준
  ];

  const [showTopButton, setShowTopButton] = useState(false);

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    if (window.scrollY > 200) {
      setShowTopButton(true);
    } else {
      setShowTopButton(false);
    }
  };

  // 스크롤 이벤트 리스너 등록
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 탑 버튼 클릭 핸들러
  const handleTopButtonClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles["team-introduction"]}>
      <h1>Lilac Studio</h1>
      <div className={styles["introParagraph"]}>
        <h2>라일락 스튜디오에 오신 것을 환영합니다!</h2>
        <p>우리의 열정적인 인디 게임 개발을 만나보세요.</p>
      </div>
      <div className={styles["frontEndDescription"]}>
        <h2>" 사이트 개발자 "</h2>
      </div>
      {/* 웹 개발자 정보 */}
      <div className={styles["team-members"]}>
        {/* 양예은 팀원 정보 */}
        <div className={styles["team-member"]}>
          <div
            className={styles["team-member-container"]}
            style={{ backgroundColor: memberBackgroundColors[0] }}
          >
            <img src="/images/DEV-Yangkong.png" alt="양콩" />
          </div>
          <div className={styles["team-member-content"]}>
            <h4>양예은(양콩)</h4>
            <p className={styles["role"]}>💛 WEB FullStack 💛</p>
            <p className={styles["roleDevelop"]}>" null "</p>
            <div className={styles["social-links"]}>
              <a
                href="https://www.instagram.com/hi._.yangkong/"
                className={styles["instagram"]}
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram size={35} />
              </a>
              <a
                href="https://github.com/DEV-Yangkong"
                className={styles["github"]}
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub size={35} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 게임 개발자 정보 */}
      <div className={styles["backEndDescription"]}>
        <h2>" 게임 개발자 "</h2>
        <p>null</p>
        <div className={styles[("backEndDescription", "addParagraph")]}>
          <p>null</p>
        </div>
      </div>
      <div className={styles["team-members"]}>
        {/* 고원준 팀원 정보 */}
        <div className={styles["team-member"]}>
          <div
            className={styles["team-member-container"]}
            style={{ backgroundColor: memberBackgroundColors[1] }}
          >
            <img src="/images/won.png" alt="고원준" />
          </div>
          <div className={styles["team-member-content"]}>
            <h4>고원준</h4>
            <p className={styles["role"]}>💙 GAME 💙</p>
            <p className={styles["roleDevelop"]}>" null "</p>
            <div className={styles["social-links"]}>
              <a
                href="https://www.instagram.com/1.jun_lilac/"
                className={styles["instagram"]}
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram size={35} />
              </a>
              {/* <a
                href="https://github.com/"
                className={styles["github"]}
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub size={35} />
              </a> */}
            </div>
          </div>
        </div>
        {/* 정민근 팀원 정보 */}
        <div className={styles["team-member"]}>
          <div
            className={styles["team-member-container"]}
            style={{ backgroundColor: memberBackgroundColors[2] }}
          >
            <img src="/images/min.png" alt="민근" />
          </div>
          <div className={styles["team-member-content"]}>
            <h4>정민근</h4>
            <p className={styles["role"]}>💙 GAME 💙</p>
            <p className={styles["roleDevelop"]}>" null "</p>
            <div className={styles["social-links"]}>
              <a
                href="https://www.instagram.com/ming_gi_0.0/"
                className={styles["instagram"]}
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram size={35} />
              </a>
              {/* <a
                href="https://github.com/"
                className={styles["github"]}
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub size={35} />
              </a> */}
            </div>
          </div>
        </div>
      </div>
      {showTopButton && (
        <button className={styles["top-button"]} onClick={handleTopButtonClick}>
          TOP
        </button>
      )}
    </div>
  );
};

export default TeamIntroduction;
