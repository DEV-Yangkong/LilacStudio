import React, { useState } from "react";
import { Link } from "react-router-dom";

const MyGameMatch = () => {
  // 멀티 플레이와 싱글 플레이 상태를 관리하는 useState
  const [selectedMode, setSelectedMode] = useState(null);

  const handleModeSelect = (mode) => {
    setSelectedMode(mode);
  };

  return (
    <section className={styles.myGameMatch}>
      <h1 className={styles.title}>게임 매칭 테스트</h1>
      <div className={styles.mainWrap}>
        <h2 className={styles.gameTitle}>나의 인생 게임 찾기</h2>
        {/* 멀티 플레이와 싱글 플레이 버튼 */}
        <div className={styles.modeButtons}>
          <button
            className={`${styles.modeButton} ${
              selectedMode === "multiplayer" ? styles.selectedMode : ""
            }`}
            onClick={() => handleModeSelect("multiplayer")}
          >
            멀티 플레이
          </button>
          <button
            className={`${styles.modeButton} ${
              selectedMode === "singleplayer" ? styles.selectedMode : ""
            }`}
            onClick={() => handleModeSelect("singleplayer")}
          >
            싱글 플레이
          </button>
        </div>
        {/* 멀티 플레이나 싱글 플레이가 선택되었을 때만 테스트 시작 버튼 표시 */}
        {selectedMode && (
          <Link
            to="/game-info/my-game-match/quiz"
            className={styles.startButton}
          >
            테스트 시작
          </Link>
        )}
        <div className={styles.sharingWrap}>
          <button className={styles.sharingLinkButton}>
            <FontAwesomeIcon icon={faLink} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default MyGameMatch;
