'use client'

import { Navbar } from '@/components/Navbar'; // Import Navbar
import '@/styles/app.css';
import '@/styles/iconly.css';
import { useState } from 'react';
import "../globals.css";

import { Sidebar } from '@/components/Sidebar';
import { useRouter } from "next/navigation"; // Import router untuk redirect

export default function RootLayout({ children }) {

    const router = useRouter();

    const [loading, setLoading] = useState(true); // Tambahkan state loading

    const navbarStyle = {
        

        // padding: '10px',
        textAlign: 'left',
        // position: 'fixed',
        top: '0',
        left: '300px', // This aligns it to the right of the sidebar
        right: '0',
        height: '60px',
        zIndex: '1000', // Ensure it stays on top
        display: 'flex',
        alignItems: 'center',
        
    };
    const sidebarStyle = {
        width: '250px',
        position: 'fixed',
        top: '0',
        left: '0',
        bottom: '0',
        backgroundColor: '#333',
        color: 'white',
        zIndex: '100', // Lower z-index than the navbar
        
    };
    const mainStyle = {
        // marginLeft: '250px', // This pushes the main content to the right of the sidebar
        marginTop: '60px',   // This ensures the content starts below the navbar
        padding: '20px',
        position: 'relative',
    };
    // className="justify-between d-flex"
    return (
        <main>
            <div id="app"  >
                <Navbar /> 
                <div id="sidebar" style={sidebarStyle} className="overflox-x-hidden">
                    <div className="sidebar-wrapper active w-[300px]">
                        <div className="sidebar-header w-[300px]">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="logo">
                                    <a href="index.html"></a>
                                </div>
                                <div className="sidebar-toggler x">
                                    <a href="#" className="sidebar-hide d-xl-none d-block">
                                        <i className="bi bi-x bi-middle" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <Sidebar />
                    </div>
                </div>
            </div>
            <div id="main" className="mt-24">
                {children}
            </div>
        </main>
    );
}
