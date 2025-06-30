"use client"

import Sidebar from "../components/Sidebar/Sidebar"
import { useState, useEffect } from "react"
import styles from './upload.module.css'
import UploadModal from "../components/upload/uploadModal/uploadModal"
import ModelSelector from "../components/upload/modelSelector/modelSelector"
import ScoreCard from "../components/upload/scoreCard/scoreCard"

export default function Upload() {
    const [isOpen, setIsOpen] = useState(false);
    const [actorFiles, setActorFiles] = useState<File[]>([]);
    const [imitatorFiles, setImitatorFiles] = useState<File[]>([]);

    const [poseModel, setPoseModel]       = useState("evitpose");
    const [assessModel, setAssessModel]   = useState("cami-2dnet");

    const [error, setError] = useState<string|null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [scores,  setScores]  = useState<Array<Record<string, number>> | null>(null);

    function pushActorFiles(newFile: File | File[]): void {
        setActorFiles((prev) => prev.concat(newFile))
    }
    function pushImitatorFiles(newFile: File | File[]): void {
        setImitatorFiles((prev => prev.concat(newFile)))
    }

    function resetActorFiles(): void {
        setActorFiles([]);
    }

    function resetImitatorFiles(): void {
        setImitatorFiles([]);
    }
    useEffect(() => {
        console.log(actorFiles)
    }, [actorFiles])

    async function onSubmit() {
      
      setError(null);

      if (
        actorFiles.length === 0 ||
        imitatorFiles.length === 0 ||
        !poseModel ||
        !assessModel
      ) {
        setError("Please ensure videos are uploaded and models selected.");
        return;
      }

      setLoading(true);
      const form = new FormData();

      // append every actor + imitator video
      actorFiles.forEach(f => form.append("actor", f));
      imitatorFiles.forEach(f => form.append("imitator", f));

      form.append("poseModel", poseModel);
      form.append("assessModel", assessModel);

      try {
        const res = await fetch("/api/analyze", {
          method: "POST",
          body: form,
        });
        if (!res.ok) throw new Error();
        const json = await res.json();
        console.log(json.scores)
          // now an array of score‐objects
        setScores(json.scores as Array<Record<string, number>>);
      } catch {
        setError("Analysis failed, please try again.");
      } finally {
        setLoading(false);
      }
    }

    function downloadCsv() {
      if (!scores || !scores.length) return;

      const header = Object.keys(scores[0]).join(",");

      const csvRows = scores.map(scoreObj => {
        return Object.values(scoreObj).join(",");
      });

      const csvContent = [header, ...csvRows].join("\n");

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.setAttribute("href", url);
      link.setAttribute("download", "scores.csv");
      link.style.visibility = 'hidden';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    
      return (
        <div className="main">
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}></Sidebar>
          <div className={`main-component ${isOpen ? 'open' : 'closed'} ${styles.uploadPage}`}>
            <div className={styles.leftSide}>
              <h1 className={styles.heading}>Cami 2-DNet: Motor Imitator Assessment</h1>
              <h3 className={styles.subHeading}>upload actor and imitator videos to analyze motor imitation performance</h3>
              <UploadModal files={actorFiles} addFiles={pushActorFiles} resetFiles={resetActorFiles} type="Actor"></UploadModal>
              <UploadModal files={imitatorFiles} addFiles={pushImitatorFiles} resetFiles={resetImitatorFiles} type="Imitator"></UploadModal>
              <ModelSelector
                  pose={poseModel}
                  assess={assessModel}
                  setPose={setPoseModel}
                  setAssess={setAssessModel}
              />
              <p className={styles.errorMessage}>{error}</p>
              <button onClick={onSubmit} className={styles.analyzeButton}>Analyze</button>
            </div>
            <div className={styles.rightSide}>
              <ScoreCard loading={loading} scores={scores}></ScoreCard>
              {
                scores?.length &&
                <button className={styles.downloadCsv} onClick={downloadCsv}>Download CSV</button>
              }
            </div>

          </div>
        </div>
      );
}