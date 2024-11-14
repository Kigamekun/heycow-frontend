'use client'
import { Button } from "@/components/ui/button";
import * as React from 'react';
import { useAuth } from '@/lib/hooks/auth';
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
import Swal from 'sweetalert2';
import { P } from "@/public/assets/extensions/chart.js/chunks/helpers.segment";
import Image from "next/image";

export default function Profile() {
    const { user, mutate,logout } = useAuth({ middleware: 'cattleman' || 'admin' });
    

    return (
        <main>
            
            <div className='time-stamp d-flex justify-center'>
                <div className='card w-[50rem]'>
                    <div className=' bg-slate-200 pt-3 pl-5 rounded-t-2xl'>
                        <p className="font-bold text-black text-xl">
                                29 Octaber 2021
                        </p>
                    </div>
                    <div className='card-body '>
                        <div className="bg-yellow-400 rounded-lg h-[2.5rem] float-end">
                            <p className="font-bold text-white text-md mt-2 mx-2">
                                On Going
                            </p>
                        </div>
                        <p className="font-bold text-black text-xl float-start">
                            Peternak Sapi Limosusine
                        </p>
                        
                    </div>
                    
                </div>
            </div>
        </main>
    );
}