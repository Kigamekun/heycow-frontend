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
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure()
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
            console.log('data',res.data);
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
    return (
        <>
            <div className="container-request d-flex rounded-tl-lg p-2 cursor-pointer fixed bottom-0 right-0 z-10 ml-[6rem] gap-3 bg-emerald-600 " onClick={onOpen}>
                <Image src={foto} className="w-[65px] h-[65px] rounded-tl-lg" />
                <div className="mt-[0.5rem]">
                    <p className="text-white text-md font-bold">Jadilah Seorang</p>
                    <p className="text-white text-md font-bold text-center mt-[-1rem] ">Pengangon</p>
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
                  <ModalBody className="grid grid-cols-2">
                    
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
        </>
    );
}