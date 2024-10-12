'use client';

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Sidebar() {
    const router = useRouter();
    const { pathname } = router;
    console.log(pathname) // Dapatkan pathname dari router

    return (
        <div className="sidebar-menu">
            <ul className="menu">
                <li className="sidebar-title">Menu</li>
                <li className={`sidebar-item ${pathname == "/admin" ? "active" : ""}`}>
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
                <li className={`sidebar-item ${pathname === "/admin/devices" ? "active" : ""}`}>
                    <Link className="sidebar-link" href="/admin/devices">
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
