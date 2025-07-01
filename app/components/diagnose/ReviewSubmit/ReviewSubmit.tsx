"use client"
import styles from "./ReviewSubmit.module.css";

type Props = {
  videoURL: string | null;
};

export default function ReviewSubmit({ videoURL }: Props) {
  return (
    <div className={styles.slide}>
      <h2 className={styles.heading}>Step 3: Review & Submit</h2>
      <p className={styles.subtext}>Watch your recorded Imitation below. If you are satisfied, click <strong>“Submit Test”</strong></p>
      {videoURL ? (
        <video controls src={videoURL} className={styles.placeholderBox} />
      ) : (
        <div className={styles.placeholderBox}>No video recorded yet.</div>
      )}
      <button className={styles.submitButton} disabled={!videoURL}>Submit Test</button>
    </div>
  );
}
