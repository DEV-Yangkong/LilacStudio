import React from "react";
import styles from "./BugReports.module.css";
import { NoServiceWarning } from "../../../modules/NoServiceWarning/NoServiceWarning";

const BugReports = () => {
  return (
    <section className={styles.bugReports}>
      <h2 className={styles.bugReportsTitle}>버그제보</h2>
      <NoServiceWarning />
    </section>
  );
};

export default BugReports;
