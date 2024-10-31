'use client';
import hoshino from "@/images/hoshino.jpg"
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { useAuth } from '@/lib/hooks/auth';

import Swal from "sweetalert2"

export function Navbar() {
    const [activePage, setActivePage] = useState('');
    const router = useRouter();
    const pathname = usePathname()
    const [userAvatar, setUserAvatar] = useState(null)

    const { user, logout } = useAuth({ middleware: 'cattleman' || 'admin' })
    // useEffect(() => {
    //     const hideNavbarPaths = ['/peternak/profile', '/admin/profile'];
    //     if (hideNavbarPaths.includes(pathname)) {
    //         document.querySelector('.header-menu').style.display = 'none';
    //     } else {
    //         document.querySelector('.header-menu').style.display = 'flex';
    //     }
    // }, [pathname]);

    const fetchUserImage = async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/users`); // Replace with your API endpoint
          setUserImage(response.data.avatar); // Adjust according to your API response structure
        } catch (error) {
          console.error('Error fetching user image:', error);
        }
    };
    useEffect(() => {
        fetchUserImage()
        setActivePage(pathname || 'dashboard');
        console.log(pathname)
    }, [pathname]);

    
    return (

        // <nav className=" top-0 right-0 w-full bg-white shadow-md z-50">
        //     <div className="flex justify-between items-center py-3 px-4">
        //         <div className="flex items-center">
        //             <Link href="/admin" className="logo">
        //                 <img src={userAvatar || "https://i.pinimg.com/control/564x/cc/5d/48/cc5d489e2acc9d119c33027454570f89.jpg"} alt="Profile" className="rounded-full w-[60px] h-15 mb-3" />
        //             </Link>
        //         </div>
        //         <div className="flex items-center">
        //             <div className="profile flex items-center">
        //                 <div className="profile-info mr-3">
        //                     <h4>{user ? user.name : 'User'}</h4>
        //                     <p>{user ? user.role : 'Role'}</p>
        //                 </div>
        //                 <div className="profile-image">
        //                     <img src={userAvatar || "https://i.pinimg.com/control/564x/cc/5d/48/cc5d489e2acc9d119c33027454570f89.jpg"} alt="Profile" className="rounded-full w-[60px] h-15 mb-3" />
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </nav>
        <header className="header">
            <nav className="header-menu fixed top-0 px-5 right-0 h-[95px] w-full bg-white px-2 " style={{zIndex: 10 }}>
                <div className="menu d-flex justify-between py-3">
                    <div className="header">
                        <Link href="/admin" className="logo">
                        <img src={userAvatar || "https://i.pinimg.com/control/564x/cc/5d/48/cc5d489e2acc9d119c33027454570f89.jpg"} alt="Profile" className="rounded-full w-[60px] h-15 mb-3" />
                        </Link>
                    </div>
                    <div className="header">
                        <div className="profile d-flex align-items-center">
                            <div className="profile-info text-right">
                                <h4 >{user ? user.name : 'User'}</h4>
                                <p >{user ? user.role : 'Role'}</p>
                            </div>
                            <div className="profile-image ml-3">
                                <img src={userAvatar || "https://i.pinimg.com/control/564x/cc/5d/48/cc5d489e2acc9d119c33027454570f89.jpg"} alt="Profile" className="rounded-full w-[60px] h-15 mb-3" />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}