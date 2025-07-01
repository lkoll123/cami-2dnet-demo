import styles from "./StepProgress.module.css";
import React from "react";

type Props = {
  currentStep: number; // 0, 1, or 2
};

const steps = ["Watch Demonstration", "Record Your Imitation", "Review & Submit"];

export default function StepProgress({ currentStep }: Props) {
  return (
    <div className={styles.container}>
      {steps.map((label, index) => {
        let circleClass = styles.ring;
        let content: React.ReactNode = null;

        if (index < currentStep) {
          circleClass = styles.complete;
          content = (
            <svg viewBox="0 0 16 16" className={styles.checkIcon}>
              <path d="M4 8l2.5 2.5L12 5" stroke="white" strokeWidth="2" fill="none" />
            </svg>
          );
        } else if (index === currentStep) {
          circleClass = styles.active;
        }

        return (
          <React.Fragment key={index}>
            <div className={styles.stepWrapper}>
              <div className={styles.step}>
                <div className={circleClass}>{content}</div>
                <span
                  className={`${styles.label} ${
                    index === currentStep ? styles.activeLabel : ""
                  }`}
                >
                  {label}
                </span>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={styles.connectorWrapper}>
                <div className={styles.connector} />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
