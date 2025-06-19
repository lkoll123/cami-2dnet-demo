"use client"

import styles from "./uploadModal.module.css"

import { useState, useRef, useEffect, ChangeEvent } from "react";
import clsx from "clsx";

interface uploadModalProps {
    type: 'Imitator' | 'Actor';
    files: File[];
    addFiles: (f: File | File[]) => void;
    resetFiles: () => void;
}

type Mode = "upload" | "record" | "files"

export default function UploadModal({ type, files, addFiles, resetFiles } : uploadModalProps) {
    const [mode, setMode] = useState<Mode>("upload");
    const [isRec, setIsRec] = useState(false);

    function handleSelect(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) addFiles(Array.from(e.target.files));
  }

  /* ------------- record handlers ------------- */
  const vidRef   = useRef<HTMLVideoElement>(null);
  const strmRef  = useRef<MediaStream | null>(null);
  const recRef = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    if (mode !== "record") return;
    navigator.mediaDevices.getUserMedia({ video: true }).then(s => {
      strmRef.current = s;
      if (vidRef.current) vidRef.current.srcObject = s;
    });
    return () => strmRef.current?.getTracks().forEach(t => t.stop());
  }, [mode]);

  function startRecording() {
    if (!strmRef.current) return;
    const rec = new MediaRecorder(strmRef.current, {
      mimeType: "video/webm",
    });
    const chunks: BlobPart[] = [];
    rec.ondataavailable = (e) => chunks.push(e.data);
    rec.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      addFiles(
        new File([blob], `recording-${Date.now()}.webm`, { type: blob.type })
      );
      setIsRec(false);
    };
    rec.start();
    recRef.current = rec;
    setIsRec(true);
  }

  function stopRecording() {
    recRef.current?.stop();
    recRef.current = null;
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

      {mode === "upload" &&
        <div className={styles.card}>
            <i className={`bx bx-upload ${styles.uploadIcon}`}></i>
            <p>Drop Video Here</p>
            <p>-or-</p>
            <p>Click to Upload</p>
            <input type="file" accept="video/*" multiple onChange={handleSelect} className={styles.fileInput}/>
        </div>
    }
    {mode === "record" &&
        <div className={styles.card}>
          <video ref={vidRef} autoPlay muted playsInline style={{ width: "100%" }} className={styles.videoBox}/>
          {!isRec ? (
            <i
              className={`bx bx-radio-circle-marked ${styles.recIcon}`}
              title="Start recording"
              onClick={startRecording}
            />
          ) : (
            <i
              className={`bx bx-stop-circle ${styles.recIcon}`}
              title="Stop recording"
              onClick={stopRecording}
            />
          )}
        </div>
    }
    {mode === "files" && (
        <div className={styles.card}>
            {files.length === 0 ? (
            <p className={styles.empty}>No videos yet.</p>
            ) : (
            <ul className={styles.fileList}>
                {files.map((f, i) => (
                <li key={i}>{f.name}</li>
                ))}
            </ul>
            )}

            <button className={styles.resetBtn} onClick={() => resetFiles()}>
            Reset
            </button>
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
        <i
        className={clsx("bx bx-list-ul", styles.icon, mode === "files" && styles.iconActive)}
        title="Files"
        onClick={() => setMode("files")}
        />
        </div>
    </section>
  );


}