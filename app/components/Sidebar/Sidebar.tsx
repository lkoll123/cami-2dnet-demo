"use client"

import { Dispatch, SetStateAction } from "react";
import 'boxicons/css/boxicons.min.css';
import styles from './Sidebar.module.css'

interface sideBarProps {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

interface navItem {
    label: string,
    icon: string,
    href: string
}

export default function Sidebar({isOpen, setIsOpen}: sideBarProps) {

    const navItems: navItem[] = [
        {label: "Home", icon: "bx bx-home", href: "/"}, 
        {label: "Upload", icon: "bx bx-upload", href: "/upload"}, 
        {label: "Diagnose", icon: "bx bx-pulse", href: "/diagnose"}
    ]
    return (
        <div className={`${styles.sideBar} ${isOpen ? styles.open : styles.closed}`}>
            <div className={styles.top}>
                <i className="bx bx-menu" id="btn" onClick={() => {
                    setIsOpen((prev) => !prev)
                    console.log(isOpen);
                    }}></i>
                <div className={styles.logo}>
                    <span>Cami Diagnosis</span>
                </div>
            </div>
            <hr></hr>
            <nav className={styles.nav}>
            {
                navItems.map(({label, icon, href}) => ( 
                    <div key={label}>
                        <a href={href} className={styles.navItem}>
                            <i className={`${icon} ${styles.icon}`} />
                            <span className={`${styles.label}`}>{label}</span>
                        </a>
                        <hr></hr>   
                    </div>
                ))
            }
            </nav>
            
        </div>
    )
}
