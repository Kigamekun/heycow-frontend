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

    // Define routes where the back button should be shown
    const showBackButtonOnRoutes = [
        '/peternak/angon/[id]',
        '/peternak/angon/pengangon',
        '/peternak/cattle/[cattleID]',
        '/peternak/cattle/[cattleID]/details'
    ];

    const fetchUserImage = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/me`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            })
    
            console.log('ada:', response.data.avatar); // Log the response to inspect its structure
            console.log('Response:', response.data);
            // Ensure the user object exists and has the avatar property
            if (response.data.avatar && response.data.avatar) {
                setUserAvatar(response.data.avatar);
            } else {
                console.error('User  object or full_image_url is undefined');
            }
            console.log('User  Avatar URL:', userAvatar);   
        } catch (error) {
            console.error('Error fetching user image:', error);
        }
    };

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
    const [isPengangon, setIsPengangon] = useState(null);

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/me`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });
            console.log('pengangon' , response.data.is_pengangon);
            if (response.data.is_pengangon !== undefined) {
                setIsPengangon(response.data.is_pengangon);
            } else {
                console.error('is_pengangon is undefined');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    

   
    useEffect(() => {
        fetchUserImage();
        fetchUserData();
    }, [pathname]);

    return (
        <header className="header">
            <nav className="header-menu fixed top-0 px-5 right-0 h-[95px] w-[72.3rem] bg-white" style={{ zIndex: 10 }}>
                <div className="justify-between py-3 menu d-flex">
                    <div className="header d-flex">
                        {/* Render the back button only if the current route is in the showBackButtonOnRoutes array */}
                        {showBackButtonOnRoutes.includes(pathname) && (
                            <button onClick={() => router.back()} className="mx-4 text-2xl text-black">
                                ← Back
                            </button>
                        )}
                        {/* Other navbar content can go here */}
                    </div>
                    <Popover>
                        <PopoverTrigger>
                            <div className="profile d-flex align-items-center gap-3">
                                <div className="text-right profile-info">
                                    <h4>{user ? user.name : 'User'}</h4>
                                    <p>{user ? user.role : 'Role'}</p>
                                </div>
                                <img src={userAvatar || 'https://images.unsplash.com/broken'} alt="Profile" className="rounded-full mt-[-1.5rem] w-[60px]" />
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
                {isPengangon === 0 && <Request />}
            </nav>
        </header>
    );
}
