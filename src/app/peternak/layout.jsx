'use client'

import "../globals.css";

import '@/styles/app.css';
import '@/styles/iconly.css';

import { Navbar } from '@/components/Navbar'; // Import Sidebar
import { Sidebar } from '@/components/Sidebar_user'; // Import Sidebar
import { useRouter } from "next/navigation"; // Import router untuk redirect
import { useState } from "react";


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

    const [loading, setLoading] = useState(true); // Tambahkan state loading

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
