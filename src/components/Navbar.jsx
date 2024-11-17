'use client';
import { useAuth } from '@/lib/hooks/auth';
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Request from '@/components/request';
export function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const [userAvatar, setUserAvatar] = useState(null);
    const { user, logout } = useAuth({ middleware: 'cattleman' || 'admin' });
    const [notificationData, setNotificationData] = useState([]);
    // Define routes where the back button should be shown
    const showBackButtonOnRoutes = [
        '/peternak/angon/[id]',
        '/peternak/angon/pengangon',
        '/peternak/cattle/[cattleID]',
        '/peternak/cattle/[cattleID]/details'
    ];

    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will be logged out!",
            icon: "warning",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm",
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                logout();
            } else {
                Swal.fire("Cancelled", "Logout cancelled", "error");
            }
        });
    };

    const getNotificationData = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/notifications`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log('Notification data:', response.data.data);  
            setNotificationData(response.data.data);
        } catch (error) {
            console.error('Error fetching notification data:', error);
        }
    }

    useEffect(() => {
    }, [pathname, user]);
    useEffect(() => {
        getNotificationData();
        const interval = setInterval(() => {
            getNotificationData();
        }, 60000); // Fetch notifications every 60 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <header className="header">
            <nav className="header-menu fixed top-0 px-5 right-0 h-[95px] w-[100%] bg-white" style={{ zIndex: 10 }}>
                <div className="justify-between py-3 menu d-flex">
                    <div className="header d-flex">
                        {showBackButtonOnRoutes.includes(pathname) && (
                            <button onClick={() => router.back()} className="mx-4 text-2xl text-black">
                                ← Back
                            </button>
                        )}
                    </div>
                    <div className='d-flex gap-3'>
                        <Popover>
                            <PopoverTrigger>
                                <div className="notification d-flex mt-[-2.7rem] align-items-center gap-1">
                                    <i className="bi bi-bell text-3xl text-black" />
                                    <span className="badge bg-red-600 rounded-full text-white px-2">{notificationData.length}</span>
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="bg-white p-2 mt-[-2rem]  cursor-pointer">
                            <div className="w-[11rem] h-[12rem] overflow-y-auto">
                                {notificationData.length > 0 ? notificationData.map((notification, index) => (
                                    <div key={index} className="justify-center gap-3 p-2 text-black d-flex">
                                        <i className="bi bi-bell" />
                                        <p>{notification.message}</p>
                                    </div>
                                )) : (
                                    <div className="justify-center gap-3 text-lg text-black mt-p-5 d-flex">
                                        <i className="bi bi-bell" />
                                        <p>No notifications</p>
                                    </div>
                                )}
                                {notificationData.length > 0 && (
                                    <Link href='/peternak/notification'>
                                        <div className="justify-center gap-3 mt-2 text-lg text-blue-600 d-flex">
                                            <i className="bi bi-arrow-right-circle" />
                                            <p>See more</p>
                                        </div>
                                    </Link>
                                )}
                            </div>
                            </PopoverContent>
                        </Popover>
                    
                       
                        <Popover>
                            <PopoverTrigger>
                                <div className="gap-3 profile d-flex align-items-center">
                                    <div className="text-right profile-info">
                                        <h4>{user ? user.name : 'User'}</h4>
                                        <p className='text-black'>{user ? user.role : 'Role'}</p>
                                    </div>
                                    <img src={user ? user.avatar : "https://images.unsplash.com/broken"} alt="Profile" className="rounded-full mt-[-1.5rem] w-[60px]" />
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="bg-white p-2 mt-[-2rem] cursor-pointer">
                                <div className="w-[10rem]">
                                    <Link href='/peternak/profile'>
                                        <div className="justify-center gap-3 text-lg text-black d-flex">
                                            <i className="bi bi-person-circle" />
                                            <p>Profile</p>
                                        </div>
                                    </Link>
                                    <div onClick={handleLogout} className="justify-center gap-3 text-lg font-bold text-red-600 d-flex">
                                        <i className="bi bi-box-arrow-right" />
                                        <p>Logout</p>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                    
                </div>
                {user && user.role==='cattleman'&& user.is_pengangon === 0 && <Request />}
            </nav>
        </header>
    );
}
