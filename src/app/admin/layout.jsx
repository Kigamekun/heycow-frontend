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
    // className="justify-between d-flex"
    return (
        <main>

            <div id="app" >
                <Navbar />

                <div id="sidebar" className="fixed left-0 z-50 justify-between d-flex bg-emerald-500" >
                    <div className="w-auto overflow-hidden sidebar-wrapper active">
                        <div className="sidebar-header w-[300px]" >
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


                </div>

                <div id="main" className="my-24 children">
                    {children}
                </div>

            </div>

        </main>
    );
}
