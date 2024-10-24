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

    const { user, logout } = useAuth({ middleware: 'cattleman' })


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
        <nav className="header-menu  top-0 right-0 h-[95px] w-[1200px] px-2 " style={{zIndex: 500 }}>
            <div className="menu d-flex justify-between mt-3">
                <div className="header">
                    <Link href="/admin" className="logo">
                    <img src={userAvatar || "https://i.pinimg.com/control/564x/cc/5d/48/cc5d489e2acc9d119c33027454570f89.jpg"} alt="Profile" className="rounded-full w-[60px] h-15 mb-3" />
                    </Link>
                </div>
                <div className="header">
                    <div className="profile d-flex align-items-center">
                        <div className="profile-info">
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
    );
}