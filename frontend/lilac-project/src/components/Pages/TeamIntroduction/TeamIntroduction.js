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
        <p>
          1. 프론트엔드 개발 (리액트): 리액트를 사용하여 웹 페이지의 사용자
          인터페이스(UI)를 개발합니다.
          <br />
          컴포넌트 기반 아키텍처를 활용하여 각 부분을 모듈화하고 재사용 가능한
          UI 요소를 구축합니다.
          <br />
          상태 관리 라이브러리나 컨텍스트를 활용하여 데이터를 효율적으로
          관리하며, 라우팅을 통해 다양한 페이지를 처리합니다.
          <br />
          2.백엔드 개발 (Node.js): Node.js를 사용하여 서버 사이드 로직을
          개발하고 RESTful API를 구축합니다.
          <br /> 클라이언트의 요청을 처리하고 데이터베이스와의 상호작용을
          관리합니다.
          <br /> Express.js와 같은 프레임워크를 활용하여 라우팅, 미들웨어, 인증,
          권한 관리 등을 구현합니다.
          <br />
          3.데이터베이스 관리 (SQL): SQL
          <br />
          데이터베이스를 설계하고 관리하여 데이터의 구조와 저장을 관리합니다.
          <br />
          데이터의 CRUD(Create, Read, Update, Delete) 작업을 수행하고 복잡한
          쿼리를 작성하여 필요한 정보를 추출하거나 조작합니다.
          <br />
          4.백엔드 프레임워크 (Django): Django를 사용하여 백엔드 개발을 진행할
          수 있습니다.
          <br /> Django는 웹 애플리케이션의 구조를 자동으로 생성하고 관리하는
          기능을 제공하므로, 백엔드 로직을 빠르게 구현할 수 있습니다.
          <br /> 모델-뷰-컨트롤러 (MVC) 아키텍처를 활용하여 데이터 모델링, 뷰
          템플릿, URL 라우팅 등을 처리합니다.
          <br />
          5.웹 애플리케이션 보안: 사용자 인증과 권한 관리를 구현하여 웹
          애플리케이션의 보안을 강화합니다.
          <br /> 암호화와 CSRF(Cross-Site Request Forgery) 방어 등의 보안 기능을
          구현하여 사용자 데이터의 안전을 유지합니다. <br />
          6.협업과 배포: Git을 활용하여 팀원들과 협업하고 코드를 관리합니다.
          <br />웹 애플리케이션의 배포와 관리를 위해 서버 설정, 도메인 연결,
          HTTPS 적용 등을 수행합니다.
        </p>
        <div className={styles[("frontEndDescription", "addParagraph")]}>
          <p>
            사용자 인터페이스(UI) 설계 및 구현, 캘린더 뷰어 개발, 이벤트 정보
            표시와 커뮤니티 기능 구현, 프론트엔드 테스팅
          </p>
        </div>
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
            <p className={styles["role"]}>💛 WEB 💛</p>
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
            style={{ backgroundColor: memberBackgroundColors[2] }}
          >
            <img src="/images/sds7629.png" alt="고원준" />
          </div>
          <div className={styles["team-member-content"]}>
            <h4>고원준</h4>
            <p className={styles["role"]}>💙 Game 💙</p>
            <p className={styles["roleDevelop"]}>" null "</p>
            <div className={styles["social-links"]}>
              <a
                href="https://www.instagram.com/"
                className={styles["instagram"]}
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram size={35} />
              </a>
              <a
                href="https://github.com/"
                className={styles["github"]}
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub size={35} />
              </a>
            </div>
          </div>
        </div>
        {/* 정민근 팀원 정보 */}
        <div className={styles["team-member"]}>
          <div
            className={styles["team-member-container"]}
            style={{ backgroundColor: memberBackgroundColors[1] }}
          >
            <img src="/images/spaceenterbs.png" alt="민근" />
          </div>
          <div className={styles["team-member-content"]}>
            <h4>방민식(빵식)</h4>
            <p className={styles["role"]}>💙 GAME 💙</p>
            <p className={styles["roleDevelop"]}>" null "</p>
            <div className={styles["social-links"]}>
              <a
                href="https://www.instagram.com/"
                className={styles["instagram"]}
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram size={35} />
              </a>
              <a
                href="https://github.com/"
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
      {showTopButton && (
        <button className={styles["top-button"]} onClick={handleTopButtonClick}>
          TOP
        </button>
      )}
    </div>
  );
};

export default TeamIntroduction;
