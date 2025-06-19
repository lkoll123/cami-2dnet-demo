/* components/ModelSelector/ModelSelector.tsx */
"use client";

import styles from "./modelSelector.module.css";

export interface ModelSelectorProps {
  pose: string;
  assess: string;
  setPose: (m: string) => void;
  setAssess: (m: string) => void;
}

export default function ModelSelector({
  pose,
  assess,
  setPose,
  setAssess,
}: ModelSelectorProps) {
  return (
    <section className={styles.modelSelector}>

      <label className={styles.group}>
        Pose Estimator
        <select value={pose} onChange={(e) => setPose(e.target.value)}>
          <option value="evitpose">EViTPose</option>
          <option value="openpose">OpenPose</option>
          <option value="hrnet">HRNet</option>
        </select>
      </label>

      <label className={styles.group}>
        Assessment Model
        <select value={assess} onChange={(e) => setAssess(e.target.value)}>
          <option value="cami-2dnet">CAMI-2DNet</option>
          <option value="cami-2d">CAMI-2D (baseline)</option>
          <option value="cami-3d">CAMI-3D (Kinect)</option>
        </select>
      </label>
    </section>
  );
}
