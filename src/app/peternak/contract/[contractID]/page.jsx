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
import { Button, Input } from '@nextui-org/react';
import Swal from 'sweetalert2';
import Link from 'next/link';
export default function ContractID( {params} ) {
    const { user, logout } = useAuth({ middleware: 'cattleman' || 'admin' })
    const [contract, setContract] = useState([]);
    
    const [returnContractData, setReturnContractData] = useState({
        id: '',
        status: 'returned',
        weight: '',
        cattle_id: '',
        user_id: '',
        height: '',
    });
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const { isOpen:isReturnOpen, onOpen: onReturnOpen, onOpenChange: onReturnChange, onClose: onReturnClose } = useDisclosure();
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
            return 'bg-blue-500';
        } else if (status === 'completed') {
                return 'bg-emerald-400';
        } else if (status === 'returned') {
            return 'bg-gray-400';
        }
    };
    const returnContract = async () => {
        const bodyFormData = new FormData();
        bodyFormData.append('status', 'returned');
        bodyFormData.append('height', returnContractData.height);
        bodyFormData.append('weight', returnContractData.weight);
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
            Swal.fire({
                icon: 'error',
                title: 'Error occurred',
                text: ['Please try again later.', error],
                showConfirmButton: false,
                timer: 1500,
            })
        }
      };

    const RatePengangon = async () => {
        const bodyFormData = new FormData();
        bodyFormData.append('rate', returnContractData.rate);
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
                title: 'Kontrak berhasil dinilai',
                showConfirmButton: false,
                timer: 1500,
            });
            setReturnContractData();
        } catch (error) {
            console.error('Error fetching contract data:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error occurred',
                text: ['Please try again later.', error],
                showConfirmButton: false,
                timer: 1500,
            })
        }
     }
    
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
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReturnContractData({ ...returnContractData, [name]: value });
      };
    return (
        <>
        <div className='d-flex justify-center'>
            <div className='card w-[40rem]'>
                <div className='card-body'>
                    <div className='d-flex justify-between'>
                        <h4 className='text-black font-bold'>Kontrak</h4>
                        <p className={`text-white text-sm font-bold p-2 rounded-xl ${getStatusClass(contract.status)}`}>{contract.status}</p>
                    </div>
                    <div className='d-flex justify-between'>
                    {contract.request && contract.request.peternak && contract.request.peternak_id === user?.id ? (
                        <p className='text-lg text-black '>Client : {contract.request.user?.name}</p>
                    ) : (
                        <p className='text-lg text-black '>Sapi : {contract.cattleName}</p>
                    )}
                    </div>
                    <hr className='mt-[-0.5rem]'/>
                    {contract.request && contract.request.peternak && contract.request.peternak_id ===  user?.id ? (
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
                            {contract.request && contract.request.peternak && contract.request.peternak_id === user?.id && contract.status !== 'returned' && (
                                <div className='d-flex justify-center mt-4'>
                                    <Button className='bg-emerald-600 rounded-lg text-white text-xl' onClick={onReturnOpen}>
                                        Selesaikan Kontrak
                                    </Button>    
                                </div>
                            )}
                             {contract.request && contract.request.peternak && contract.request.peternak_id !== user?.id && contract.status === 'returned' && contract.rate === null ? (
                                <form className='mt-4' onSubmit={RatePengangon}>
                                    <div className='d-flex justify-center'>
                                        <ReactStars count={5} size={45} value={returnContractData.rate} edit={true} color2={'#ffd700'} onChange={(newRating) => setReturnContractData({ ...returnContractData, rate: newRating })} />
                                    </div>
                                    <div className='d-flex justify-center'>
                                    <Button className='mx-auto bg-emerald-600 rounded-lg text-white text-xl' type="submit">
                                        Berikan Rating pada Peternak!
                                    </Button>
                                    </div>
                                        
                                </form>
                            )
                            :
                            (
                            <div>
                                <Link href='/peternak/cattle' className='d-flex justify-center'>
                                    <Button className='bg-emerald-600 rounded-lg text-white text-xl mt-4'>
                                        Kembali ke Sapi
                                    </Button>
                                </Link>
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
                            
                            {contract.request.user && contract.request.peternak_id && contract.request.peternak_id !== user?.id  &&(
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
                                <Link href='/peternak/history'>
                                <iframe  src={`https://heycow.my.id/transactions/create-charge/${params.contractID}`} width="100%" height="600px" />
                                </Link>
                            </ModalContent>
                        </ModalBody>
                    </Modal>
                </div>
                <Modal 
                    isOpen={isReturnOpen} 
                    onOpenChange={onReturnChange}
                    scrollBehavior="inside"
                    placement="center"
                    backdrop="opaque"
                    classNames={{
                    backdrop: "bg-black bg-opacity-50"
                    }}
                    >
                    <form onSubmit={returnContract}>
                      <ModalContent className="w-[800px] h-[500px] bg-white rounded-xl ">
                      {(onReturnChange) => (
                      <>
                      <ModalHeader className="dialog-title flex flex-col gap-2 px-6 mt-6">
                          <h3 className="text-black font-bold text-center">Final Return Cattle</h3>
                      </ModalHeader>
                      <ModalBody className="grid">
                          {/* Cattle Name */}
                          <div className="grid-cols-1">
                            <label htmlFor="height" className="font-bold text-black mb-[-1rem]">
                                <h6>Final Height</h6>
                            </label>
                            <Input 
                                id='height'
                                name='height'
                                type='text'
                                placeholder='Final Height'
                                onChange={handleInputChange}
                                value={returnContractData.height}
                            />
                            </div>
                            <div className="grid-cols-1">
                            <label htmlFor="weight" className="font-bold text-black mb-[-1rem]">
                                <h6>Final Weight</h6>
                            </label>
                            <Input 
                                id='weight'
                                name='weight'
                                type='text'
                                placeholder='Final Weight'
                                onChange={handleInputChange}
                                value={returnContractData.weight}
                            />
                            </div>
                          </ModalBody>
                          <ModalFooter>

                          <Button isSubmit className="bg-emerald-600 text-md text-white rounded-md" onPress={() => { onReturnChange(); returnContract(); }}>
                          Submit
                          </Button>
                          </ModalFooter>
                      </>
                      )}
                  </ModalContent>
                </form>
              </Modal>
            </div>
        </div>
            
        </>
    )
}