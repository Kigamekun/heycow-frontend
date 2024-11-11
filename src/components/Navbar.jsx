'use client';
import hoshino from "@/images/hoshino.jpg"
import axios from "axios";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { useAuth } from '@/lib/hooks/auth';

import Swal from "sweetalert2"
import Image from "next/image";
import { Avatar } from "@nextui-org/react";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import Request from "./request";

export function Navbar() {
    const [activePage, setActivePage] = useState('');
    const router = useRouter();
    const pathname = usePathname()
    const [userAvatar, setUserAvatar] = useState(null)
    const [previousPath, setPreviousPath] = useState('');
    const [lastSegment, setLastSegment] = useState('');

    const { user, logout } = useAuth({ middleware: 'cattleman' || 'admin' })
    // useEffect(() => {
    //     const hideNavbarPaths = ['/peternak/profile', '/admin/profile'];
    //     if (hideNavbarPaths.includes(pathname)) {
    //         document.querySelector('.header-menu').style.display = 'none';
    //     } else {
    //         document.querySelector('.header-menu').style.display = 'flex';
    //     }
    // }, [pathname]);

    const fetchUserImage = async () => {
        console.log('fetching user image...');
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
        fetchUserImage();
        // if (user) {
        //     fetchUserImage();
        // }
        setActivePage(pathname || 'dashboard');
        console.log(pathname),
        // Store the previous path in state
        setPreviousPath(window.location.pathname);

        // Get the last segment of the pathname
        const segments = window.location.pathname.split('/peternak');
        setLastSegment(segments[segments.length - 1]);
    }, [pathname]);

    const handleBackClick = () => {
        if (previousPath === window.location.pathname) {
            router.back();
        } else {
            router.push('/');
        }
    };

    useEffect(() => {
        console.log('User  Avatar Updated:', userAvatar); // Log whenever userAvatar changes
    }, [userAvatar]);

    const handleImageLoad = (event) => {
        event.target.setAttribute('data-loaded', 'true');
        console.log('Image loaded successfully');
    };
    
    return (
        <>
            <header className="header">
                <nav className="header-menu fixed top-0 px-5 right-0 h-[95px] w-[78rem] bg-white px-2 " style={{zIndex: 10 }}>
                    <div className="menu d-flex justify-between py-3">
                        <div className="header d-flex">
                            <i class="bi bi-arrow-left text-black text-2xl mt-3 mx-4"></i>
                            {/* <p onClick={handleBackClick} className="back-button text-black text-xl font-bold mt-[1.2rem]">
                                {previousPath === window.location.pathname}
                            </p> */}
                            {/* <p onClick={() => router.back()} className="back-button text-black text-xl font-bold mt-[1.2rem]">
                                Kembali ke halaman sebelumnya
                            </p> */}
                            {/* <Link href="/admin" className="logo">
                                <span className="page-tag">{activePage}</span>
                            </Link> */}
                        </div>
                        <Popover>
                            <PopoverTrigger>
                                <div className="header">
                                    <div className="profile d-flex align-items-center">
                                        <div className="profile-info text-right">
                                            <h4>{user ? user.name : 'User'}</h4>
                                            <p>{user ? user.role : 'Role'}</p>
                                        </div>
                                        <div className="ml-3">
                                            <img src={userAvatar || 'https://images.unsplash.com/broken'} alt="Profile" className="rounded-full w-[60px] mb-3" onLoad={handleImageLoad}/>
                                        </div>
                                    </div>
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="bg-white p-2 mt-[-2rem] cursor-pointer">
                                <div className="w-[10rem]">
                                    <Link href='/peternak/profile' >
                                        <div className='d-flex gap-3 justify-center text-black text-lg'>
                                            <i className=" bi bi-person-circle" />
                                            <p>Profile</p>
                                        </div>
                                    </Link>
                                    <div  onClick={onClickLogout} className="d-flex justify-center gap-3 text-lg text-red-600 font-bold">
                                        <i className=" bi bi-box-arrow-right"  />  
                                        <p>Logout</p>
                                    </div>
                                
                                </div>
                            </PopoverContent>
                        </Popover>
                        
                    </div>
                </nav>
            </header>
            {user && user.is_pengangon === 0 && user.role !== 'admin' && <Request/>}
        </>
    );
}