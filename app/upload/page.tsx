"use client"

import Sidebar from "../components/Sidebar"
import { useState } from "react"

export default function Upload() {
    const [isOpen, setIsOpen] = useState(false);
    
      return (
        <div className="main">
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}></Sidebar>
          <div className={`main-component ${isOpen ? 'open' : 'closed'}`}></div>
        </div>
      );
}