'use client'
import axios from "axios";
import React from "react";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
    Checkbox, 
    Link
} from '@nextui-org/modal';

import { UserCircleCheck } from "@phosphor-icons/react";
import { Input } from "@nextui-org/react";
import { Select, SelectItem, SelectSection } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import foto from '@/images/Farmer-profile.jpg'
import { animals } from "@/app/peternak/cattle/dummy";

export default function Request() {
    const [request, setRequest] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [user, setUser] = React.useState([]);
    const [userData, setUserData] = React.useState({
        id: 0,
        ktp: null,
        nik: '',
        upah: '',
        selfie_ktp: null,
    });
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const getUserData = async () => {
        try {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/me`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                }
            );
            // console.log('data', res.data);
            setUser(res.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        getUserData();
    }, []); // Empty dependency array to run only once

    const updateMe = async (e) => {
        e.preventDefault();
        try {
            const bodyFormData = new FormData();
            bodyFormData.append('ktp', userData.ktp);
            bodyFormData.append('nik', userData.nik);
            bodyFormData.append('upah', userData.upah);
            bodyFormData.append('selfie_ktp', userData.selfie_ktp);

            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/users/submit-request-form`, bodyFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });
            // console.log('update:', res.data);
            setUserData(res.data);
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleFileChange = (event) => {
        const { name, files } = event.target;
        setUserData({ ...userData, [name]: files[0] });
    };

    return (
        <>
            <div className="container-request d-flex rounded-tl-lg p-2 cursor-pointer fixed bottom-0 right-0 z-10 ml-[6rem] gap-3 bg-emerald-600 " onClick={onOpen}>
                {/* <Image src={foto} className="w-[65px] h-[65px] rounded-tl-lg" /> */}
                <UserCircleCheck size={64} className="text-white mt-[0.5rem]"/>
                <div className="mt-[1rem]">
                    <p className="text-white text-md font-bold">Jadilah Seorang</p>
                    <p className="text-white text-md font-bold text-left mt-[-1rem] ">Pengangon</p>
                </div>
            </div>
            <style jsx>{`
                @keyframes slideUp {
                    from {
                        transform: translateY(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }

                .container-request {
                    animation: slideUp 0.5s ease-out;
                }
            `}</style>

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
                <ModalContent className="w-[800px] h-[650px] bg-white rounded-xl ">
                {(onClose) => (
                  <>
                  <ModalHeader className="dialog-title flex flex-col gap-1 px-6 mt-6">
                    <h3 className="text-black font-bold text-center">Jadilah Pengangon!</h3>
                  </ModalHeader>
                  <ModalBody className="">
                    <form className="grid grid-cols-1 gap-4 p-3" onSubmit={updateMe}>
                        <div className="">
                            <label htmlFor="nik" >
                                <h5>NIK <span className="text-red-700">*</span></h5>
                            </label>
                            <Input
                                    isRequired
                                    id="nik"
                                    name="nik"
                                    autoFocus
                                    type="text"
                                    value={userData.nik}
                                    placeholder="Edit NIK mu"
                                    variant="bordered"
                                    className="w-full h-[2.8rem] "
                                    onChange={handleInputChange}
                                    />
                        </div>

                        <div className="">
                            <label htmlFor="upah" >
                                <h5>Upah Gaji / Bulan <span className="text-red-700">*</span></h5>
                            </label>
                            <Input
                                    isRequired
                                    id="upah"
                                    name="upah"
                                    autoFocus
                                    type="text"
                                    value={userData.upah}
                                    placeholder="Edit upah mu"
                                    variant="bordered"
                                    className="w-full h-[2.8rem] "
                                    onChange={handleInputChange}
                                    />
                        </div>
                        <div className="">
                            <label htmlFor="ktp" >
                                <h5>KTP <span className="text-red-700">*</span></h5>
                            </label>
                            <Input
                                    isRequired
                                    id="ktp"
                                    name="ktp"
                                    autoFocus
                                    type="file"
                                    placeholder="Edit KTP mu"
                                    variant="bordered"
                                    className="w-full h-[2.8rem] "
                                    onChange={handleFileChange}
                                    />
                        </div>    
                        <div className="">
                            <label htmlFor="selfie_ktp" >
                                <h5>Selfie KTP <span className="text-red-700">*</span></h5>
                            </label>
                            <Input
                                    isRequired
                                    id="selfie_ktp"
                                    name="selfie_ktp"
                                    autoFocus
                                    type="file"
                                    placeholder="Masukkan Selfie KTP mu"
                                    variant="bordered"
                                    className="w-full h-[2.8rem] "
                                    onChange={handleFileChange}
                                    />
                        </div>   
                        <ModalFooter>
                            <Button type="submit" className="bg-emerald-600 text-md text-white rounded-xl">
                                Submit
                            </Button>
                        </ModalFooter>
                    </form>
                    
                  </ModalBody>
                  </>
                )}
              </ModalContent>
            </Modal>
        </>
    );
}