import React from "react";
import styles from "./News.module.css";

const News = () => {
  return (
    <section className={styles.News}>
      <h2 className={styles.heading}>새소식</h2>
      <p>게임과 관련된 새소식을 살펴보세요.</p>
    </section>
  );
};

export default News;
