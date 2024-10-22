'use client';
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { useAuth } from '@/lib/hooks/auth';

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
            // confirmButtonColor: "#6A9944",
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
        <div className="sidebar-menu bg-emerald-600 mt-9 fixed top w-[300px] h-full text-white" >
            <ul className="menu text-white">
                <li className="sidebar-title text-white">Menu</li>
                <li className={`sidebar-item ${pathname === "/peternak" ? "active" : ""}`}>
                    <Link href="/peternak" className="sidebar-link">
                        <i className="bi bi-grid-fill text-white" />
                        <span className="text-white">Home</span>
                    </Link>
                </li>
                <li className={`sidebar-item ${pathname === "/peternak/komunitas" ? "active" : ""}`}>
                    <Link className="sidebar-link" href="/peternak/about">
                        <i className="bi bi-grid-fill text-white" />
                        <span className="text-white">Komunitas</span>
                    </Link>
                </li>
                <li className="sidebar-title text-white">Management</li>

                <li className={`sidebar-item ${pathname === "/peternak/cattle" ? "active" : ""}`}>
                    <Link className="sidebar-link" href="/peternak/cattle">
                        <i className="bi bi-grid-fill" />
                        <span className="text-white">Cattle</span>
                    </Link>
                </li>
                <li className={`sidebar-item ${pathname === "/peternak/angon" && "/peternak/angon/pengangon" ? "active" : ""}`}>
                    <Link className="sidebar-link" href="/peternak/angon">
                        <i className="bi bi-grid-fill text-white" />
                        <span className="text-white">Angon</span>
                    </Link>
                </li>
                <li className={`sidebar-item ${pathname === "/peternak/help-center" ? "active" : ""}`}>
                    <Link className="sidebar-link" href="/peternak/help-center">
                        <i className="bi bi-grid-fill text-white" />
                        <span className="text-white">Help Center</span>
                    </Link>
                </li>
                <li className={`sidebar-item ${pathname === "/peternak/profile" ? "active" : ""}`}>
                    <Link className="sidebar-link text-white" href="/peternak/profile">
                        <i className="bi bi-grid-fill text-white " />
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
