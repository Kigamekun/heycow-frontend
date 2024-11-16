'use client'

import { useAuth } from '@/lib/hooks/auth';
import { useEffect, useState } from 'react';
import axios from "axios";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";

import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
    Checkbox, 
} from '@nextui-org/modal';

import ReactStars from 'react-stars';
import { Button } from '@nextui-org/react';
import Swal from 'sweetalert2';
export default function ContractID( {params} ) {
    const { user, logout } = useAuth({ middleware: 'cattleman' || 'admin' })
    const [contract, setContract] = useState([]);
    
    const [returnContractData, setReturnContractData] = useState({
        id: '',
        status: 'returned',
        new_value: '',
        cattle_id: '',
        user_id: '',
        old_value: '',
        message: '',
    });
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const getContractID = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/contract/${params.contractID}`, {
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

    const getStatusClass = (status) => {
        if (status === 'pending') {
            return 'bg-orange-400';
        } else if (status === 'active') {
            return 'bg-yellow-400';
        } else if (status === 'completed') {
                return 'bg-emerald-400';
        } else if (status === 'returned') {
            return 'bg-green-400';
        }
    };
    const returnContract = async () => {
        const bodyFormData = new FormData();
        bodyFormData.append('status', 'returned');
        bodyFormData.append('new_value', );
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/contract/${params.contractID}/return`, bodyFormData,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log('Contract data:', res.data.data);
            Swal.fire({
                icon: 'success',
                title: 'Kontrak berhasil dikembalikan',
                showConfirmButton: false,
                timer: 1500,
            });
            setReturnContractData();
        } catch (error) {
            console.error('Error fetching contract data:', error);
        }
      };
    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
    };
    console.log( formatDate(contract.start_date));
    useEffect(() => {
        const handlePaymentComplete = (event) => {
          if (event.origin === 'https://heycow.my.id' && event.data === 'payment_complete') {
            window.location.href = '/peternak/history';
          }
        };
    
        window.addEventListener('message', handlePaymentComplete);
    
        return () => {
          window.removeEventListener('message', handlePaymentComplete);
        };
      }, []);

      useEffect(() => {
        getContractID();
    }, [])
    return (
        <>
        <div className='d-flex justify-center'>
            <div className='card w-[40rem]'>
                <div className='card-body'>
                    <div className='d-flex justify-between'>
                        <h4 className='text-black font-bold'>Kontrak</h4>
                        <p className={`text-black text-sm font-bold p-2 rounded-xl ${getStatusClass(contract.status)}`}>{contract.status}</p>
                    </div>
                    <div className='d-flex justify-between'>
                        {contract.request && contract.request.peternak && contract.request.peternak_id === user.id && user.id ?(<p className='text-lg text-black '>Client : {contract.request && contract.request.user.name}</p>) : (<p className='text-lg text-black '>Sapi : {contract.cattleName && contract.cattleName}</p>)}
                        
                    </div>
                    <hr className='mt-[-0.5rem]'/>
                    {contract.request && contract.request.peternak && contract.request.peternak_id ===  user.id && user.id  ? (
                        <div className='d-flex justify-center gap-3 mt-4'>
                            <img src={contract.request && contract.request.user && contract.request.user.full_avatar_url || "https://via.placeholder.com/130"} alt="user" className="w-[20rem]" />
                            <div className=''>
                                <Table>
                                    <TableHeader>
                                        <TableRow className="text-lg">
                                            <TableCell>Data</TableCell>
                                            <TableCell>Detail</TableCell>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow className="text-black">
                                            <TableCell className="font-medium text-lg">Cattle Name</TableCell>
                                            <TableCell className="font-thin text-md">{contract.cattle && contract.cattle.name}</TableCell>
                                        </TableRow>
                                        <TableRow className="text-black">
                                            <TableCell className="font-medium text-lg">Cattle Type</TableCell>
                                            <TableCell className="font-thin text-md">Sapi {contract.cattle && contract.cattle.type}</TableCell>
                                        </TableRow>
                                        <TableRow className="text-black">
                                            <TableCell className="font-medium text-lg">Cattle Height</TableCell>
                                            <TableCell className="font-thin text-md">{contract.cattle && contract.cattle.birth_height} cm</TableCell>
                                        </TableRow>
                                        <TableRow className="text-black">
                                            <TableCell className="font-medium text-lg">Cattle Weight</TableCell>
                                            <TableCell className="font-thin text-md">{contract.cattle && contract.cattle.birth_weight} kg</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    ) : (
                        <div className='d-flex gap-10'>
                            <div className='gap-2'>
                                <img src={contract.request && contract.request.peternak && contract.request.peternak.full_avatar_url || "https://via.placeholder.com/130"} alt="user" className="w-[20rem]" />
                                <div className='d-flex justify-center'>
                                    <ReactStars count={5} size={45} value={contract.rate} edit={false} color2={'#ffd700'} />
                                </div>
                            </div>
                            
                            <div className=''>
                                <Table>
                                    <TableHeader>
                                        <TableRow className="text-lg">
                                            <TableCell>Detail</TableCell>
                                            <TableCell>Data</TableCell>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow className="text-black">
                                            <TableCell className="font-medium text-lg">Farm Name</TableCell>
                                            <TableCell className="font-thin text-md">{contract.farm && contract.farm.name}</TableCell>
                                        </TableRow>
                                        <TableRow className="text-black">
                                            <TableCell className="font-medium text-lg">Farmer Name</TableCell>
                                            <TableCell className="font-thin text-md"> {contract.request && contract.request.peternak && contract.request.peternak.name}</TableCell>
                                        </TableRow>
                                        <TableRow className="text-black">
                                            <TableCell className="font-medium text-lg">Farm Address</TableCell>
                                            <TableCell className="font-thin text-md">{contract.farm && contract.farm.address}</TableCell>
                                        </TableRow>
                                        <TableRow className="text-black">
                                            <TableCell className="font-medium text-lg">Phone Number</TableCell>
                                            <TableCell className="font-thin text-md">{contract.request && contract.request.peternak && contract.request.peternak.phone_number}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    )}
                    
                    <hr className='mt-[0.5rem]'/>
                    <div className='px-28'>
                        <div className='d-flex justify-between'>
                            <p className='text-lg text-black font-bold'>Waktu Mulai</p>
                            <p className='text-lg text-black font-medium'>{formatDate(contract.start_date)}</p>
                        </div>
                        <div className='d-flex justify-between'>
                            <p className='text-lg text-black font-bold'>Waktu Akhir</p>
                            <p className='text-lg text-black font-medium'>{formatDate(contract.end_date)}</p>
                        </div>
                    </div>
                    <hr className=''/>
                    <div className='d-flex px-28'>
                        <p className='text-lg text-black font-bold'>Biaya</p>
                    </div>
                    <div className='d-flex px-28 justify-between'>
                        <p className='text-lg text-black font-bold'>Jasa Pengangon</p>
                        <p className='text-lg text-black font-bold'>{contract.pengangonFee}</p>
                    </div>
                    <div className='d-flex px-28 justify-start'>
                        <p className='text-lg text-black'>{contract.request && contract.request.peternak && contract.request.peternak.name}</p>
                    </div>
                    {contract.payment_status !== null && (
                        <div className='mt-4'>
                            <div className='d-flex justify-end gap-6 px-16'>
                                <i className="bi bi-check-circle text-emerald-600 text-2xl font-bold"></i>
                                <p className='text-emerald-600 text-2xl font-bold'>Lunas</p> 
                             </div>
                            {contract.request && contract.request.peternak && contract.request.peternak_id === user.id && user.id && (
                                <div className='d-flex justify-center mt-4'>
                                    <Button className='bg-emerald-600 rounded-lg text-white text-xl' onClick={returnContract}>
                                        Selesaikan Kontrak
                                    </Button>    
                                </div>
                            )}
                        </div>
                    )}
                    {contract.payment_status === null && (
                        <div className='mt-4'>
                            <div className='d-flex justify-end gap-6 px-16'>
                                <i className="bi bi-dash-circle text-red-600 text-2xl font-bold"></i>
                                <p className='text-red-600 text-2xl font-bold'>Belum Dibayar</p> 
                            </div>
                            {contract.user && contract.user.id === user.id && (
                                <div className='d-flex justify-center mt-4'>
                                    <Button className='bg-emerald-600 rounded-lg text-white text-xl' onClick={onOpen}>
                                        Bayar Sekarang
                                    </Button>    
                                </div>
                            )}
                        </div>
                    )}

                    <Modal   
                    isOpen={isOpen} 
                    onOpenChange={onOpenChange}
                    scrollBehavior="inside"
                    placement="center"
                    backdrop="opaque"
                    classNames={{
                    backdrop: "bg-black bg-opacity-50"
                    }}>
                        <ModalHeader>
                            <h3 className='text-black font-bold text-center'>Pembayaran</h3>
                        </ModalHeader>
                        <ModalBody className='w-[55rem] h-full'>
                            <ModalContent>
                                <iframe  src={`https://heycow.my.id/transactions/create-charge/${params.contractID}`} width="100%" height="600px" />
                            </ModalContent>
                        </ModalBody>
                    </Modal>
                </div>
               
            </div>
        </div>
            
        </>
    )
}