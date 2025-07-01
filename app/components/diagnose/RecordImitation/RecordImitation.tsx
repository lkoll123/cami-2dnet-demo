import { useRef, useEffect, useState } from "react";
import styles from "./RecordImitation.module.css";

type Props = {
  stream: MediaStream | null;
  startRecording: () => void;
  stopRecording: () => void;
};

export default function RecordImitation({ stream, startRecording, stopRecording }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const handleToggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
    setIsRecording(!isRecording);
  };

  return (
    <div className={styles.slide}>
      <h2 className={styles.heading}>Step 2: Record Your Imitation</h2>
      <p className={styles.subtext}>
        On the left, you see the demonstration video. On the right, your live webcam feed. <br />
        Click <strong>“Start Imitation”</strong> to start recording, and <strong>“Stop Imitation”</strong> to end.
      </p>

      <div className={styles.videoRow}>
        <div className={styles.demoColumn}>
          <p className={styles.label}>Demo</p>
          <video
            src="/videos/demo.mp4"
            controls
            className={styles.videoBox}
          />
        </div>

        <div className={styles.videoColumn}>
          <p className={styles.label}>Your Recording</p>
          <video
            ref={videoRef}
            autoPlay
            muted
            className={styles.videoBox}
          />
        </div>
      </div>

      <div className={styles.controls}>
        <button className={styles.recordButton} onClick={handleToggleRecording}>
          {isRecording ? "Stop Imitation" : "Start Imitation"}
        </button>
      </div>
    </div>
  );
}
