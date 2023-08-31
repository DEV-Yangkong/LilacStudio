import React from "react";
import styles from "./FAQ.module.css";
import { NoServiceWarning } from "../../../modules/NoServiceWarning/NoServiceWarning";

const FAQ = () => {
  return (
    <section className={styles.faq}>
      <h2 className={styles.faqTitle}>FAQ</h2>
      <NoServiceWarning />
    </section>
  );
};

export default FAQ;
