"use client"

import Sidebar from "../components/Sidebar/Sidebar"
import { useState } from "react"
import styles from './upload.module.css'
import UploadModal from "../components/uploadModal/uploadModal"

export default function Upload() {
    const [isOpen, setIsOpen] = useState(false);
    const [actorFiles, setActorFiles] = useState<File[]>([]);
    const [imitatorFiles, setImitatorFiles] = useState<File[]>([]);

    function pushActorFile(newFile: File | File[]): void {
        setActorFiles((prev) => prev.concat(newFile))
    }
    function pushImitatorFile(newFile: File | File[]): void {
        setImitatorFiles((prev => prev.concat(newFile)))
    }

    function onSubmit() {

    }
    
      return (
        <div className="main">
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}></Sidebar>
          <div className={`main-component ${isOpen ? 'open' : 'closed'}`}>
            <h1 className={styles.heading}>Cami 2-DNet: Motor Imitator Assessment</h1>
            <h3 className={styles.subHeading}>upload actor and imitator videos to analyze motor imitation performance</h3>
            <UploadModal files={actorFiles} addFiles={pushActorFile} type="Actor"></UploadModal>
            <UploadModal files={imitatorFiles} addFiles={pushImitatorFile} type="Imitator"></UploadModal>
            <button onClick={onSubmit} className={styles.analyzeButton}>Analyze</button>
          </div>
        </div>
      );
}