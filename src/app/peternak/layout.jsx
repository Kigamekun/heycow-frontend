'use client'

import localFont from "next/font/local";
import "../globals.css";

import '@/styles/app.css';
import '@/styles/iconly.css';

import { useRouter } from "next/navigation"; // Import router untuk redirect
import * as React from "react"
import { Sidebar } from '@/components/Sidebar_user'; // Import Sidebar
import { Navbar } from '@/components/Navbar'; // Import Sidebar
// import { useEffect } from "react";


export default function RootLayout({ children }) {
    const { pathname } = useRouter();

    // React.useEffect(()=>{
    //     const hideMarginTop =['/peternak/profile'];
    //     if (hideMarginTop.includes(pathname)){
    //         document.querySelector('#id').style.display = 'my-0'; 
    //     } else {
    //         document.querySelector('#id')..display ='my-24'
    //     }
    // },[pathname])

    const router = useRouter();

    const [loading, setLoading] = React.useState(true); // Tambahkan state loading

    return (
        <main>
            
            <div id="app" >
                <Navbar />
                <div id="sidebar" className="d-flex fixed left-0 justify-between bg-emerald-500 z-50" >
                        <div className="sidebar-wrapper w-auto active overflow-hidden">
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
              
                <div id="main" className=" children my-24"> 
                    {children}
                </div>
                
            </div>
            
        </main>
    );
}
