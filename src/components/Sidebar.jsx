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

    const { user, logout } = useAuth({ middleware: 'admin' })


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
        <div className="sidebar-menu h-full overflow-x-hidden" style={{zIndex: 600}}>
            <ul className="menu">
                <li className="sidebar-title">Menu</li>
                <li className={`sidebar-item ${pathname === "/admin" ? "active" : ""}`}>
                    <Link href="/admin" className="sidebar-link">
                        <i className="bi bi-grid-fill" />
                        <span>Dashboard</span>
                    </Link>
                </li>
                <li className={`sidebar-item ${pathname === "/admin/blog" ? "active" : ""}`}>
                    <Link className="sidebar-link" href="/admin/blog">
                        <i className="bi bi-grid-fill" />
                        <span>Community</span>
                    </Link>
                </li>
                <li className="sidebar-title">Management</li>
                <li className={`sidebar-item ${pathname === "/admin/user" ? "active" : ""}`}>
                    <Link className="sidebar-link" href="/admin/user">
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

            </ul>
        </div>
    );
}
