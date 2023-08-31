import React from "react";
import styles from "./Contact.module.css";
import { NoServiceWarning } from "../../../modules/NoServiceWarning/NoServiceWarning";

const Contact = () => {
  return (
    <section className={styles.contact}>
      <h2 className={styles.contactTitle}>고객센터</h2>
      <NoServiceWarning />
    </section>
  );
};

export default Contact;
