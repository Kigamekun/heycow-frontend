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

    const { user, logout } = useAuth({ middleware: 'cattleman' })

    // const onClickProfile = () => {
    //     Swal.fire({
    //         title: "Anda yakin?",
    //         text: "Anda akan logout!",
    //         icon: "warning",
    //         showCancelButton: true,
    //         // confirmButtonColor: "#6A9944",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "Confirm",
    //         cancelButtonText: "Cancel"
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             logout(); // Execute the logout function
    //         } else {
    //             Swal.fire("Cancelled", "Logout cancelled", "error");
    //         }
    //     });
    // };

    useEffect(() => {
        setActivePage(pathname || 'dashboard');
        console.log(pathname)
    }, [pathname]);

    
    return (
        <nav className="header-menu fixed top-0 w-full h-[95px] bg-white px-5 ">
            <div className="menu d-flex justify-between mt-3">
                <div className="header">
                    <Link href="/admin" className="logo">
                        <img src="/images/logo.png" alt="Logo" />
                    </Link>
                </div>
                <div className="header">
                    <div className="profile d-flex align-items-center">
                        <div className="profile-info ">
                            <h4>{user ? user.name : 'Admin'}</h4>
                            <p >{user ? user.role : 'Role'}</p>
                        </div>
                        <div className="profile-image ml-3">
                            <img src="https://i.pinimg.com/control/564x/cc/5d/48/cc5d489e2acc9d119c33027454570f89.jpg"alt="Profile" className="rounded-full w-[60px] h-15 mb-3" />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}