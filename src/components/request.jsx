'use client'
import axios from "axios";
import react from "react";
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
import { Button } from "@nextui-org/react";

export default function Request(){
    const [request, setRequest] = react.useState([]);
    const [loading, setLoading] = react.useState(true);

    return(
        <>
            <div className="container-request h-[50px] d-flex justify-center w-full fixed z-10 ml-[6rem] gap-3 bg-black bg-opacity-25">
                <div className="mt-[0.7rem]">
                    <p className="text-white text-xl font-bold">Request Jadi Pengangon!</p>
                </div>
                <a className="text-xl mt-[0.7rem] cursor-pointer text-red-600 font-bold">Request</a>
                
            </div>
        </>
    )
}