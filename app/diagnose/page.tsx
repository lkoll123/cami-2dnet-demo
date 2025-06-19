"use client"

import Sidebar from "../components/Sidebar/Sidebar"
import { useState } from "react"

export default function Diagnose() {
    const [isOpen, setIsOpen] = useState(false);
    
      return (
        <div className="main">
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}></Sidebar>
          <div className={`main-component ${isOpen ? 'open' : 'closed'}`}></div>
    
        </div>
      );
}