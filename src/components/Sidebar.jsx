'use client';
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";


export function Sidebar() {
    const [activePage, setActivePage] = useState('');
    const router = useRouter();
    const pathname = usePathname()

    useEffect(() => {
        setActivePage(pathname || 'dashboard');
        console.log(pathname)
    }, [pathname]);

    return (
        <div className="sidebar-menu">
            <ul className="menu">
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
            </ul>
        </div>
    );
}
