"use client"

import Sidebar from "./components/Sidebar";
import { useState } from 'react';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="main">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}></Sidebar>
      <div className={`main-component ${isOpen ? 'open' : 'closed'}`}>
        <section className="home-shell">
          <h1 className="home-title">Welcome to CAMI&nbsp;2-DNet</h1>

          <p className="home-sub">
            Select an action below or use the sidebar.
          </p>

          <div className="home-actions">
            <a href="/upload"   className="home-card">
              <i className="bx bx-upload home-icon" />
              <span>Upload Video</span>
            </a>

            <a href="/diagnose" className="home-card">
              <i className="bx bx-pulse home-icon" />
              <span>Run&nbsp;Diagnosis</span>
            </a>
          </div>
        </section>
      </div>

    </div>
  );
}
