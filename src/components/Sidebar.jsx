'use client';
import heycow from '@/images/heycow_img.svg';
import { useAuth } from '@/lib/hooks/auth';
import { Barn, Cow, Lasso, ListBullets, Scroll } from '@phosphor-icons/react';
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

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
        <div className="fixed top-0 bottom-0 left-0 h-full overflow-x-hidden sidebar-menu bg-emerald-600">
            <div className="image-container w-[300px] px-4 mt-3">
                <Link href="/peternak">
                    <Image
                        src={heycow}
                        alt="Descriptive Alt Text"
                        width={180}s
                        height={50}
                    />
                </Link>
            </div>
            <ul className="menu">
                <li className="sidebar-title">Menu</li>
                <li className={`sidebar-item ${pathname === "/admin" ? "active" : ""}`}>
                    <Link href="/admin" className="sidebar-link">
                        <i className="bi bi-grid-fill" />
                        <span>Dashboard</span>
                    </Link>
                </li>
                <li className="sidebar-title">Management Menu</li>
                <li className={`sidebar-item ${pathname === "/admin/user" ? "active" : ""}`}>
                    <Link className="sidebar-link" href="/admin/user">
                        <i className="bi bi-person-fill" />
                        <span>User</span>
                    </Link>
                </li>
                <li className={`sidebar-item ${pathname === "/admin/blog" ? "active" : ""}`}>
                    <Link className="sidebar-link" href="/admin/blog">
                        <i className="bi bi-chat-dots" />
                        <span>Community</span>
                    </Link>
                </li>
                <li className="sidebar-title">Farm Management</li>
                <li className={`sidebar-item ${pathname === "/admin/farm" ? "active" : ""}`}>
                    <Link className="sidebar-link" href="/admin/farm">
                        <div className="ph">
                            <Barn className="ph-barn" size={20} />
                        </div>
                        <span>Farm</span>
                    </Link>
                </li>
                <li className={`sidebar-item ${pathname === "/admin/cattle" ? "active" : ""}`}>
                    <Link className="sidebar-link" href="/admin/cattle">
                        <div className="ph">
                            <Cow className="ph-cow" size={20} />
                        </div>
                        <span>Cattle</span>
                    </Link>
                </li>
                <li className={`sidebar-item ${pathname === "/admin/breeds" ? "active" : ""}`}>
                    <Link className="sidebar-link" href="/admin/breeds">
                        <div className="ph">
                            <ListBullets className="ph-listb" size={20} />
                        </div>
                        <span>Breeds</span>
                    </Link>
                </li>
                <li className={`sidebar-item ${pathname === "/admin/device" ? "active" : ""}`}>
                    <Link className="sidebar-link" href="/admin/device">
                        <div className='ph'>
                            <Lasso className='ph-scroll' size={20} />
                        </div>
                        <span>Devices</span>
                    </Link>
                </li>
                <li className={`sidebar-item ${pathname === "/admin/asign-device" ? "active" : ""}`}>
                    <Link className="sidebar-link" href="/admin/asign-device">
                        <i className="bi bi-check2-circle" />
                        <span>Assign Device</span>
                    </Link>
                </li>
                <li className={`sidebar-item ${pathname === "/admin/contract" ? "active" : ""}`}>
                    <Link className="sidebar-link" href="/admin/contract">
                        <div className='ph'>
                            <Scroll className='ph-scroll' />
                        </div>
                        <span>Contract</span>
                    </Link>
                </li>
                <li className="sidebar-title">Request Management</li>
                <li className={`sidebar-item ${pathname === "/admin/request" ? "active" : ""}`}>
                    <Link className="sidebar-link" href="/admin/request">
                        <i className="bi bi-send" />
                        <span>Request</span>
                    </Link>
                </li>
                <li className={`sidebar-item ${pathname === "/admin/request-pengangon" ? "active" : ""}`}>
                    <Link className="sidebar-link" href="/admin/request-pengangon">
                        <i className="bi bi-send-check" />
                        <span>Request Pengagon</span>
                    </Link>
                </li>
                <button className="mb-6">
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
