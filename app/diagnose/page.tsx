"use client"

import Sidebar from "../components/Sidebar/Sidebar"
import { useState } from "react"
import WatchDemo from "../components/diagnose/WatchDemo/WatchDemo";
import RecordImitation from "../components/diagnose/RecordImitation/RecordImitation";
import ReviewSubmit from "../components/diagnose/ReviewSubmit/ReviewSubmit";
import StepProgress from "../components/diagnose/StepProgress/StepProgress";

import styles from "./diagnose.module.css"

export default function Diagnose() {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState<number>(0)
    const renderStepContent = () => {
      switch(step) {
        case 0:
          return <WatchDemo />
        case 1:
          return <RecordImitation />
        case 2:
          return <ReviewSubmit />
        default:
          return null
      }
    }
    
      return (
        <div className="main">
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}></Sidebar>
          <div className={`main-component ${isOpen ? 'open' : 'closed'}`}>
            <h1 className={styles.title}>Motor Imitation Test</h1>
            <div className={styles.diagnoseMain}>
              <div className={styles.stepProgressWrapper}>
                <StepProgress currentStep={step} />
              </div>
              <div className={styles.step_content}>
                {renderStepContent()}
              </div>
              <div className={styles.stepButtons}>
                <button className={styles.stepButton} disabled={step == 0} onClick={() => setStep(step - 1)}>Back</button>
                <button className={styles.stepButton} disabled={step == 2} onClick={() => setStep(step + 1)}>Next</button>
              </div>
            </div>
          </div>
            
        </div>
      );
}