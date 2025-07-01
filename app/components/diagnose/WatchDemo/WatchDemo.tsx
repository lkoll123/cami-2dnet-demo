"use client"
import styles from "./WatchDemo.module.css"

export default function WatchDemo() {
  return (
    <div className={styles.slide}>
      <h2>Step 1: Watch the Demonstration</h2>
      <p>Please watch the demonstration video carefully.</p>
      {/* Replace with actual video player */}
      <video
        src="/videos/demo.mp4"
        controls
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}