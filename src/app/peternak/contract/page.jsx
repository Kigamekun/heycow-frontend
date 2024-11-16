'use client';
import { Button } from "@/components/ui/button";
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
} from '@nextui-org/modal';
import { Input } from "@/components/ui/input";
import Swal from 'sweetalert2';
import Image from "next/image";
import Link from 'next/link';

export default function Contract() {
    const { user, mutate, logout } = useAuth({ middleware: 'cattleman' || 'admin' });
    const [contract, setContract] = useState([]);
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [collapsedIndex, setCollapsedIndex] = useState(null);
    const [approved, setApproved] = useState({ status: 'approved' });
    const [isBouncing, setIsBouncing] = useState(false);
    const [requests, setRequests] = useState([]);
    const [cattleData, setCattleData] = useState(null);

    const toggleCollapse = (index) => {
        setIsCollapsed(!isCollapsed);
        setCollapsedIndex(collapsedIndex === index ? null : index);
    };

    const getStatusClass = (status) => {
        if (status === 'pending') {
            return 'bg-yellow-400';
        } else if (status === 'active') {
            return 'bg-emerald-500';
        } else if (status === 'completed') {
                return 'bg-emerald-400';
        } else if (status === 'returned') {
            return 'bg-gray-400';
        }
    };


    const getContract = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/contract`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log('Contract data:', res.data.data);
            setContract(res.data.data);
        } catch (error) {
            console.error('Error fetching contract data:', error);
        }
    };

    useEffect(() => {
        getContract();
    }, []);

    return (
        <>
            <h3 className="mb-4 ml-2 text-emerald-600">Contract</h3>
            <div className="grid grid-cols-1 gap-6">
                {contract && contract.map((contract, index) => (
                    <div key={index} className="d-flex justify-center">
                        <div className="w-[60rem] p-4 bg-white border border-gray-300 rounded-lg shadow-sm">
                            <Link href={`/peternak/contract/${contract.id}`}>
                                <div
                                    className="grid grid-cols-[1fr_auto] items-center cursor-pointer border-black pb-2"
                                    onClick={() => toggleCollapse(index)}
                                >
                                    <h3 className="text-lg font-semibold float-start">{contract.title}</h3>
                                    <h3 className={`text-lg text-white p-2 rounded-xl font-semibold float-end ${getStatusClass(contract.status)}`}>{contract.status}</h3>
                                </div>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
