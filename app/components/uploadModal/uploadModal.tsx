"use client"

import styles from "./uploadModal.module.css"

import { useState, useRef, useEffect, ChangeEvent } from "react";
import clsx from "clsx";

interface uploadModalProps {
    type: 'Imitator' | 'Actor';
    files: File[];
    addFiles: (f: File | File[]) => void;
}

type Mode = "upload" | "record"

export default function UploadModal({ type, files, addFiles } : uploadModalProps) {
    const [mode, setMode] = useState<Mode>("upload");

    function handleSelect(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) addFiles(Array.from(e.target.files));
  }

  /* ------------- record handlers ------------- */
  const vidRef   = useRef<HTMLVideoElement>(null);
  const strmRef  = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (mode !== "record") return;
    navigator.mediaDevices.getUserMedia({ video: true }).then(s => {
      strmRef.current = s;
      if (vidRef.current) vidRef.current.srcObject = s;
    });
    return () => strmRef.current?.getTracks().forEach(t => t.stop());
  }, [mode]);

  function capture() {
    if (!strmRef.current) return;
    const rec = new MediaRecorder(strmRef.current, { mimeType: "video/webm" });
    const chunks: BlobPart[] = [];
    rec.ondataavailable = e => chunks.push(e.data);
    rec.start();
    setTimeout(() => rec.stop(), 3000);
    rec.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      addFiles(new File([blob], `recording-${Date.now()}.webm`, { type: blob.type }));
    };
  }

  /* ------------- render ------------- */
  return (
    <section className={styles.panel}>
      <header className={styles.header}>
        <div className={styles.headerTag}>
            <i className={`bx bx-video-recording ${styles.headerIcon}`}></i>
            <p>{`${type} video`}</p>
        </div>
      </header>

      {mode === "upload" ? (
        <div className={styles.card}>
            <i className={`bx bx-upload ${styles.uploadIcon}`}></i>
            <p>Drop Video Here</p>
            <p>-or-</p>
            <p>Click to Upload</p>
            <input type="file" accept="video/*" multiple onChange={handleSelect} className={styles.fileInput}/>
        </div>
      ) : (
        <div className={styles.card}>
          <video ref={vidRef} autoPlay muted playsInline style={{ width: "100%" }} className={styles.videoBox}/>
          <button className={styles.captureBtn} onClick={capture}>Capture&nbsp;3&nbsp;s</button>
        </div>
      )}
      <hr className={styles.divider}></hr>
      <div className={styles.toggles}>
          <i
            className={clsx("bx bx-upload", styles.icon, mode === "upload" && styles.iconActive)}
            title="Upload file"
            onClick={() => setMode("upload")}
          />
          <i
            className={clsx("bx bx-webcam", styles.icon, mode === "record" && styles.iconActive)}
            title="Record webcam"
            onClick={() => setMode("record")}
          />
        </div>
    </section>
  );


}