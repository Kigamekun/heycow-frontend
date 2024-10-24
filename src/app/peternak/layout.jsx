'use client'

import localFont from "next/font/local";
import "../globals.css";

import '@/styles/app.css';
import '@/styles/iconly.css';

import { useRouter } from "next/navigation"; // Import router untuk redirect
import * as React from "react"
import { Sidebar } from '@/components/Sidebar_user'; // Import Sidebar
import { Navbar } from '@/components/Navbar'; // Import Sidebar



export default function RootLayout({ children }) {

    const router = useRouter();

    const [loading, setLoading] = React.useState(true); // Tambahkan state loading

    return (
        <main>
            <div id="app" >
                <div id="sidebar" className="d-flex justify-between bg-emerald-50">
                        <Navbar className="fixed"/>
                        <div className="sidebar-wrapper active overflow-hidden bg-emerald-600">
                            <div className="sidebar-header bg-emerald-600 " >
                                <div className="d-flex justify-content-between align-items-center bg-emerald-600">
                                    <div className="logo bg-emerald-600">
                                        <a href="index.html">
                                        </a>
                                    </div>
                                    <div className="sidebar-toggler x bg-emerald-600">
                                        <a href="#" className="sidebar-hide d-xl-none d-block">
                                            <i className="bi bi-x bi-middle" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <Sidebar />
                        </div>
                        {/* <Navbar /> */}
                    </div>
                
                {/* <div id="sidebarXnavbar" className="d-flex bg-emerald-600 justify-between" >
                    <div id="sidebar" className="bg-emerald-600">
                        <div className="sidebar-wrapper active bg-emerald-600">
                            <div className="sidebar-header position-relative bg-emerald-600">
                                <div className="d-flex justify-content-between align-items-center bg-emerald-600 ">
                                    <div className="logo">
                                        <a href="index.html">
                                        </a>
                                    </div>
                                    <div className="sidebar-toggler x bg-emerald-600">
                                        <a href="#" className="sidebar-hide d-xl-none d-block">
                                            <i className="bi bi-x bi-middle" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <Sidebar />
                        </div>
                        <Navbar/>
                    </div>
                
                </div>
                <div id="main" className="flex-grow-1" style={{ marginTop: '80px' }}>
                    {children}
                </div>
            </div> */}
                <div id="main" className="flex-grow-1" style={{ marginTop: '80px' }}>
                    {children}
                </div>
            </div>
            
        </main>
    );
}
