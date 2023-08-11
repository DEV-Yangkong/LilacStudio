import React from "react";
import Sidebar from "../../Sidebar/Sidebar";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.home}>
      <section className={styles.mainContent}>
        <h2>라일락 스튜디오에 오신 것을 환영합니다!</h2>
        <p>우리의 열정적인 인디 게임 개발을 만나보세요.</p>
        <Sidebar />
      </section>
    </div>
  );
};

export default Home;
