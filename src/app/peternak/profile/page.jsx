'use client'
import { Button } from "@/components/ui/button";
import * as React from 'react';
import { useAuth } from '@/lib/hooks/auth';
import Image from 'next/image';
import { Avatar } from '@nextui-org/react';
import { Editor } from '@tinymce/tinymce-react';
import {Select, SelectSection, SelectItem} from "@nextui-org/react";
import { useState, useEffect } from 'react';
import axios from "axios";
import { usePathname, useRouter } from 'next/navigation';
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
    Checkbox, 
    Link
} from '@nextui-org/modal'
import { Input } from "@/components/ui/input"
// kita buat function fetching api

export default function Profile() {
    const { user, logout } = useAuth({ middleware: 'cattleman' || 'admin  '})
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure()
    const handleInputChange = (event) => {

    const { name, value } = event.target;
        setCattle({ ...cattle, [name]: value });
    }
      
    const handleSelectChange = (event) => {
        
    const name = event.target.name;
    const {value} = event.target.selectedOptions[0];
        console.log(value);
        setCattle({ ...cattle, [name]: value });
        
    }
    const [userAvatar, setUserAvatar] = React.useState('');
    const fetchUserImage = async () => {
        console.log('fetching user image...');
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/me`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            })
    
            console.log('ada:', response.data.full_avatar_url); // Log the response to inspect its structure
            console.log('Response:', response.data);
            // Ensure the user object exists and has the full_image_url property
            if (response.data.full_avatar_url && response.data.full_avatar_url) {
                setUserAvatar(response.data.full_avatar_url);
            } else {
                console.error('User  object or full_avatar_url is undefined');
            }
            console.log('User  Avatar URL:', userAvatar);   
        } catch (error) {
            console.error('Error fetching user image:', error);
        }
    };
    useEffect(() => {
        fetchUserImage();
        // if (user) {
        //     fetchUserImage();
        // }
        // setActivePage(pathname || 'dashboard');
        // console.log(pathname)
    },[]);
    
    useEffect(() => {
        console.log('User  Avatar Updated:', userAvatar); // Log whenever userAvatar changes
    }, [userAvatar]);

    const handleImageLoad = (event) => {
        event.target.setAttribute('data-loaded', 'true');
        console.log('Image loaded successfully');
    };
    return(
       
        <main>
            <Modal 
                    isOpen={isOpen} 
                    onOpenChange={onOpenChange}
                    scrollBehavior="inside"
                    placement="center"
                    backdrop="opaque"
                    classNames={{
                    backdrop: "bg-black bg-opacity-50"
                    }}
                    >
                    <ModalContent className="w-[700px] h-[650px] bg-white rounded-xl ">
                    {(onClose) => (
                    <>
                    <ModalHeader className="dialog-title flex flex-col gap-1 px-6 mt-6">
                        <h3 className="text-black font-bold text-center">Edit Profile</h3>
                    </ModalHeader>
                    <ModalBody >
                        {/* Cattle Name */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="grid grid-cols-1 gap-1">
                                <label htmlFor="name" className="text-black font-bold">
                                <h6>
                                    Username<span className="text-red-600">*</span>
                                </h6>
                                </label>
                                <Input
                                isRequired
                                id="name"
                                autoFocus
                                type="text"
                                label="text"
                                placeholder="Input your cattle name"
                                variant="bordered"
                                className="w-full h-[2.8rem] "
                                onChange={handleInputChange}
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-1">
                                <label htmlFor="email" className="text-black font-bold">
                                <h6>
                                    Email<span className="text-red-600">*</span>
                                </h6>
                                </label>
                                <Input
                                isRequired
                                id="email"
                                autoFocus
                                type="email"
                                label="text"
                                placeholder="Edit email mu"
                                variant="bordered"
                                className="w-full h-[2.8rem] "
                                onChange={handleInputChange}
                                />
                            </div>

                            {/* Cattle Height */}
                            <div className="grid grid-cols-1 gap-1">
                                <label htmlFor="role" className="text-black font-bold">
                                <h6>
                                    Role
                                </h6>
                                </label>
                                <Input
                                id="role"
                                isDisabled
                                autoFocus
                                type="text"
                                label="text"
                                variant="bordered"
                                className="w-full h-[2.8rem] "
                                defaultValue="junior@nextui.org"
                                />
                            </div>

                            {/* Cattle Weight */}
                            <div className="grid grid-cols-1 gap-1">
                                <label htmlFor="weight" className="text-black font-bold">
                                <h6>
                                    Cattle Weight<span className="text-red-600">*</span>
                                </h6>
                                </label>
                                <Input
                                id="weight"
                                autoFocus
                                type="text"
                                label="text"
                                placeholder="Input your cattle weight"
                                variant="bordered"
                                className="w-full h-[2.8rem] "
                                onChange={handleInputChange}
                                />
                            </div>

                            
                        </div>
                        <div className="d-flex justify-center"></div>
                        {/* No Telp*/}
                        <div className="grid grid-cols-1 gap-1">
                                <label htmlFor="role" className="text-black font-bold">
                                <h6>
                                    No. Telp
                                </h6>
                                </label>
                                <Input
                                id="role"
                                autoFocus
                                type="text"
                                label="text"
                                variant="bordered"
                                className="w-full h-[2.8rem] "
                                defaultValue="junior@nextui.org"
                                />
                            </div>
                        {/* BIO */}
                        <div className="grid grid-cols-1 gap-1">
                            <label htmlFor="role" className="text-black font-bold">
                            <h6>
                                Bio
                            </h6>
                            </label>
                            <Input
                                id="weight"
                                autoFocus
                                type="textarea"
                                placeholder="Input your bio"
                                variant="bordered"
                                className="w-full h-[2.8rem] "
                                onChange={handleInputChange}
                                />
                        </div>
                        {/* BIO */}
                        <div className="grid grid-cols-1 gap-1">
                            <label htmlFor="role" className="text-black font-bold">
                            <h6>
                                Avatar
                            </h6>
                            </label>
                            <Input
                                id="weight"
                                autoFocus
                                type="file"
                                label="text"
                                placeholder="Input your cattle weight"
                                variant="bordered"
                                className="w-full h-[2.8rem] "
                                onChange={handleInputChange}
                                />
                        </div>
                        
                        </ModalBody>
                        <ModalFooter>

                        <Button isSubmit className="bg-emerald-600 text-md" onPress={onClose}>
                        Submit
                        </Button>
                        </ModalFooter>
                    </>
                    )}
                </ModalContent>
            </Modal>
            <div className='edit-profile-card d-flex justify-center'>
                <div className='card w-[650px]'>
                    <div className='card-body mb-[-1.5rem] '>
                        <Button className='bg-emerald-600 float-end ' onClick={onOpen}>
                            <i className='bi mr-3 text-white bi-pencil-fill'/> 
                            Edit Profile
                        </Button>
                        <div>
                            <div className='profile-picture d-flex justify-center'>
                                <img src={userAvatar} width={120} height={120} alt="Profile" className="rounded-full ml-[9rem]"  onLoad={handleImageLoad}/>
                                
                            </div>
                            <h5 className='mt-3 text-black font-bold text-center'>{user ? user.name : "mulyono"}</h5>
                        </div>
                    </div>
                    <div className='profile-data card-body  px-5'>
                        <div className='grid grid-cols-2 gap-3'>
                            <div>
                                <p className='text-md mb-[-0.2rem] text-black font-bold'>
                                    No. Telp
                                </p>
                                <div className='border rounded-md h-[3rem] py-2 px-1'>
                                    <p className='text-md text-black font-light'>
                                        {user ? user.phone_number : "081282520510"}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <p className='text-md mb-[-0.2rem] text-black font-bold'>
                                    Email
                                </p>
                                <div className='border rounded-md h-[3rem] py-2 px-1'>
                                    <p className='text-md text-black font-light'>
                                        {user? user.email : "mulyono25@gmail.com"}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <p className='text-md mb-[-0.2rem] text-black font-bold'>
                                    Role
                                </p>
                                <div className='border rounded-md bg-gray-300 h-[3rem] py-2 px-1'>
                                    <p className='text-md text-black font-light'>
                                        {user ? user.role : 'user'}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <p className='text-md mb-[-0.2rem] text-black font-bold'>
                                    Farm
                                </p>
                                <div className='border rounded-md h-[3rem] py-2 px-1'>
                                    <p className='text-md text-black font-light'>
                                        {user ? user.farm_id : '-'}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='mt-3'>
                            <p className='text-md mb-[-0.2rem] text-black font-bold'>
                                Bio Profile
                            </p>
                            <div className='border rounded-md py-2 px-1'>
                                <p className='text-md text-black font-light'>
                                    {user ? user.bio : '-'}
                                </p>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </main>
    );
}