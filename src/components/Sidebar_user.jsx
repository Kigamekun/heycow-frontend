'use client';
import { useAuth } from '@/lib/hooks/auth';
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

import heycow from '@/images/heycow_img.svg';
import Image from "next/image";
import Swal from "sweetalert2";

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
        <div className="fixed top-0 bottom-0 left-0 h-full overflow-x-hidden sidebar-menu bg-emerald-600">
           

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
             <ul className=" menu">
                 <li className=" sidebar-title">Menu</li>
                 <li className={`sidebar-item ${pathname === "/peternak" ? "active" : ""}`}>
                     <Link href="/peternak" className="sidebar-link">
                         <i className="bi bi-house-door-fill" />
                         <span className="">Home</span>
                     </Link>
                 </li>
                 <li className={`sidebar-item ${pathname === "/peternak/komunitas" ? "active" : ""}`}>
                     <Link className="sidebar-link" href="/peternak/komunitas">
                        < i class="bi bi-chat-dots-fill " />
                         <span className="">Komunitas</span>
                     </Link>
                 </li>
                 <li className=" sidebar-title">Management</li>

                 <li className={`sidebar-item ${pathname === "/peternak/cattle" ? "active" : ""}`}>
                     <Link className="sidebar-link" href="/peternak/cattle">
                         <i className=" bi bi-grid-fill"  />
                         <span className="">Cattle</span>
                     </Link>
                 </li>
                 <li className={`sidebar-item ${pathname === "/peternak/angon" && "/peternak/angon/pengangon" ? "active" : ""}`}>
                     <Link className="sidebar-link" href="/peternak/angon">
                         <i className=" bi bi-file-person-fill" />
                         <span className="">Angon</span>
                     </Link>
                 </li>
                 <li className={`sidebar-item ${pathname === "/peternak/help-center" ? "active" : ""}`}>
                     <Link className="sidebar-link" href="/peternak/help-center">
                         <i className=" bi bi-telephone-fill" />
                         <span className="">Help Center</span>
                     </Link>
                 </li>
                 <li className={`sidebar-item ${pathname === "/peternak/history" ? "active" : ""}`}>
                     <Link className="sidebar-link" href="/peternak/history">
                            <i class="bi bi-clock-history "></i>
                            <span className="">History</span>
                     </Link>
                 </li>
                 <li className={`sidebar-item ${pathname === "/peternak/profile" ? "active" : ""}`}>
                     <Link className=" sidebar-link" href="/peternak/profile">
                         <i className=" bi bi-person-circle" />
                         <span className="">Profile</span>
                     </Link>
                 </li>

                 <button>
                     <li className="sidebar-item">
                         <a className="sidebar-link" onClick={onClickLogout}>
                             <i className=" bi bi-box-arrow-right" />
                             <span className="">Logout</span>
                         </a>
                     </li>
                 </button>

             </ul>
        </div>
    );
}
