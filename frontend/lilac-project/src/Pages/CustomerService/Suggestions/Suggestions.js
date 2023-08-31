import React from "react";
import styles from "./Suggestions.module.css";
import { NoServiceWarning } from "../../../modules/NoServiceWarning/NoServiceWarning";

const Suggestions = () => {
  return (
    <section className={styles.suggestions}>
      <h2 className={styles.suggestionsTitle}>건의사항</h2>
      <NoServiceWarning />
    </section>
  );
};

export default Suggestions;
