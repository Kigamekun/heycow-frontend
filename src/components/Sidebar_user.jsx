'use client';
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { useAuth } from '@/lib/hooks/auth';

import Image from "next/image";
import heycow from '@/images/heycow_img.svg'
import Swal from "sweetalert2"

export function Sidebar() {
    const [activePage, setActivePage] = useState('');
    const router = useRouter();
    const pathname = usePathname()

    const { user, logout } = useAuth({ middleware: 'user' })


    const onClickLogout = () => {
        Swal.fire({
            title: "Anda yakin?",
            text: "Anda akan logout!",
            icon: "warning",
            showCancelButton: true,
            //  confirmButtonColor: "#6A9944",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm",
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                logout(); // Execute the logout function
            } else {
                Swal.fire("Cancelled", "Logout cancelled", "error");
            }
        });
    };

    useEffect(() => {
        setActivePage(pathname || 'dashboard');
        console.log(pathname)
    }, [pathname]);

    return (
        <div className="sidebar-menu top-0 left-0 bottom-0 fixed h-full overflow-x-hidden  bg-emerald-600">
            {/* <ul className="menu">
                <li className="sidebar-title">Menu</li>
                <li className={`sidebar-item ${pathname === "/admin" ? "active" : ""}`}>
                    <Link href="/admin" className="sidebar-link">
                        <i className="bi bi-grid-fill" />
                        <span>Dashboard</span>
                    </Link>
                </li>
                <li className={`sidebar-item ${pathname === "/admin/about" ? "active" : ""}`}>
                    <Link className="sidebar-link" href="/admin/about">
                        <i className="bi bi-grid-fill" />
                        <span>About</span>
                    </Link>
                </li>
                <li className="sidebar-title">Management</li>
                <li className={`sidebar-item ${pathname === "/" ? "active" : ""}`}>
                    <Link className="sidebar-link" href="/">
                        <i className="bi bi-person-fill" />
                        <span>User</span>
                    </Link>
                </li>
                <li className="sidebar-title">Farm</li>
                <li className={`sidebar-item ${pathname === "/admin/farm" ? "active" : ""}`}>
                    <Link className="sidebar-link" href="/admin/farm">
                        <i className="bi bi-grid-fill" />
                        <span>Farm</span>
                    </Link>
                </li>
                <li className={`sidebar-item ${pathname === "/admin/cattle" ? "active" : ""}`}>
                    <Link className="sidebar-link" href="/admin/cattle">
                        <i className="bi bi-grid-fill" />
                        <span>Cattle</span>
                    </Link>
                </li>
                <li className={`sidebar-item ${pathname === "/admin/device" ? "active" : ""}`}>
                    <Link className="sidebar-link" href="/admin/device">
                        <i className="bi bi-grid-fill" />
                        <span>Devices</span>
                    </Link>
                </li>
                <li className={`sidebar-item ${pathname === "/" ? "active" : ""}`}>
                    <Link className="sidebar-link" href="/">
                        <i className="bi bi-grid-fill" />
                        <span>History</span>
                    </Link>
                </li>
                <li className={`sidebar-item ${pathname === "/admin/report" ? "active" : ""}`}>
                    <Link className="sidebar-link" href="/admin/report">
                        <i className="bi bi-grid-fill" />
                        <span>Report</span>
                    </Link>
                </li>

                <button>
                    <li className="sidebar-item">
                        <a className="sidebar-link" onClick={onClickLogout}>
                            <i className="bi bi-box-arrow-right" />
                            <span>Logout</span>
                        </a>
                    </li>
                </button>

            </ul> */}

            <div className="image-container w-[300px] px-4 mt-3">
                <Link href="/peternak">
                    <Image
                        src={heycow}
                        alt="Descriptive Alt Text"
                        width={180}
                        height={50}
                    />
                </Link>
            </div>
             <ul className="menu text-white">
                 <li className="sidebar-title text-white">Menu</li>
                 <li className={`sidebar-item ${pathname === "/peternak" ? "active" : ""}`}>
                     <Link href="/peternak" className="sidebar-link">
                         <i className="bi bi-house-door-fill text-white" />
                         <span className="text-white">Home</span>
                     </Link>
                 </li>
                 <li className={`sidebar-item ${pathname === "/peternak/komunitas" ? "active" : ""}`}>
                     <Link className="sidebar-link" href="/peternak/komunitas">
                        <  i class="bi bi-chat-dots-fill text-white" />
                         <span className="text-white">Komunitas</span>
                     </Link>
                 </li>
                 <li className="sidebar-title text-white">Management</li>

                 <li className={`sidebar-item ${pathname === "/peternak/cattle" ? "active" : ""}`}>
                     <Link className="sidebar-link" href="/peternak/cattle">
                         <i className="bi bi-grid-fill text-white"  />
                         <span className="text-white">Cattle</span>
                     </Link>
                 </li>
                 <li className={`sidebar-item ${pathname === "/peternak/angon" && "/peternak/angon/pengangon" ? "active" : ""}`}>
                     <Link className="sidebar-link" href="/peternak/angon">
                         <i className="bi bi-file-person-fill text-white" />
                         <span className="text-white">Angon</span>
                     </Link>
                 </li>
                 <li className={`sidebar-item ${pathname === "/peternak/help-center" ? "active" : ""}`}>
                     <Link className="sidebar-link" href="/peternak/help-center">
                         <i className="bi bi-telephone-fill text-white" />
                         <span className="text-white">Help Center</span>
                     </Link>
                 </li>
                 <li className={`sidebar-item ${pathname === "/peternak/profile" ? "active" : ""}`}>
                     <Link className="sidebar-link text-white" href="/peternak/profile">
                         <i className="bi bi-person-circle text-white " />
                         <span className="text-white">Profile</span>
                     </Link>
                 </li>

                 <button>
                     <li className="sidebar-item">
                         <a className="sidebar-link" onClick={onClickLogout}>
                             <i className="bi bi-box-arrow-right text-white" />
                             <span className="text-white">Logout</span>
                         </a>
                     </li>
                 </button>

             </ul>
        </div>
    );
}
