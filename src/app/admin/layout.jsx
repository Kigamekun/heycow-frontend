'use client'

import localFont from "next/font/local";
import "../globals.css";

import '@/styles/app.css';
import '@/styles/iconly.css';

import { useRouter } from "next/navigation"; // Import router untuk redirect
import * as React from "react"
import { Sidebar } from '@/components/Sidebar';

export default function RootLayout({ children }) {

    const router = useRouter();

    const [loading, setLoading] = React.useState(true); // Tambahkan state loading

    return (
        <main>
            <div id="app">
                <div id="sidebar">
                    <div className="sidebar-wrapper active">
                        <div className="sidebar-header position-relative">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="logo">
                                    <a href="index.html">
                                    </a>
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
                <div id="main">
                    {children}
                </div>
            </div>
        </main>
    );
}
