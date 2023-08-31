import React from "react";
import styles from "./Gallery.module.css";
import { NoServiceWarning } from "../../../modules/NoServiceWarning/NoServiceWarning";

const Gallery = () => {
  return (
    <section className={styles.gallery}>
      <h2 className={styles.galleryTitle}>갤러리</h2>
      <NoServiceWarning />
    </section>
  );
};

export default Gallery;
