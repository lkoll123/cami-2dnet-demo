"use client"

import Sidebar from "../components/Sidebar/Sidebar"
import { useState, useEffect } from "react"
import styles from './upload.module.css'
import UploadModal from "../components/uploadModal/uploadModal"
import ModelSelector from "../components/modelSelector/modelSelector"

export default function Upload() {
    const [isOpen, setIsOpen] = useState(false);
    const [actorFiles, setActorFiles] = useState<File[]>([]);
    const [imitatorFiles, setImitatorFiles] = useState<File[]>([]);

    const [poseModel, setPoseModel]       = useState("evitpose");
    const [assessModel, setAssessModel]   = useState("cami-2dnet");

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

    function onSubmit() {

    }
    
      return (
        <div className="main">
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}></Sidebar>
          <div className={`main-component ${isOpen ? 'open' : 'closed'}`}>
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
            <button onClick={onSubmit} className={styles.analyzeButton}>Analyze</button>
          </div>
        </div>
      );
}