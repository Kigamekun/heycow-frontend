'use client'


import ReactStars from "react-stars"
import { Button } from "@/components/ui/button"
import * as React from "react"
import { Image } from "@nextui-org/react"
import { profile } from '@/images/Farmer-profile.jpg'
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table"


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
  
import { ArrowUpDown, Link } from "lucide-react"
import { useAuth } from "@/lib/hooks/auth"; // Hook untuk autentikasi

import {Select, SelectSection, SelectItem} from "@nextui-org/react";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
    Checkbox, 
} from '@nextui-org/modal'
import axios from "axios"
import Swal from "sweetalert2"
import { useRouter } from "next/navigation" 

import Cattle from "@/app/admin/cattle/page"
export default function Home({ params }) {
  const { user, logout } = useAuth({ middleware: 'cattleman' || 'admin' })
  const router = useRouter();
  const [userData, setUserData] = React.useState([]);
//   const { id } = router.query; // Get the user ID from the URL
const getUserDataID = async () => {
    console.log('Fetching user data angon...');
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/users/${params.id}`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        });
        if (response.data.data) {
            setUserData(response.data.data);
            console.log('User data:', response.data.data);
        }
        // Fetch IoT device data if iot_device_id is available
        // if (response.data.data.iot_device_id) {
        //     const iotResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/iot_devices/${response.data.data.iot_device_id}`, {
        //         headers: {
        //             'content-type': 'application/json',
        //             'Authorization': `Bearer ${localStorage.getItem('token')}`,
        //         }
        //     });
        //     setIotDeviceData(iotResponse.data.data);
        //     console.log('data nya ',setIotDeviceData);
        // }
    } catch (error) {
        console.error('Error fetching cattle data:', error);
        if (error.response && error.response.status === 401) {
            Swal.fire({
                icon: 'error',
                title: error.response.data.message,
                showConfirmButton: false,
                timer: 1500
            });
            logout();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error terjadi',
                text: 'Mohon coba lagi nanti.',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
};

  React.useEffect(() => {
    getUserDataID();
  }, [params.id]);
    // if (id) {
    //     getUserData();
    //   }
    // }, [id]);

  return (
    <>
        <h3 className="ml-2 text-emerald-600">Pengangon</h3>
        <div className="d-flex justify-center">
            <div className="card p-4 w-[650px] ">
                <div className="card-body">
                    <h4 className="text-black font-bold">{userData.name}</h4>
                </div>
            </div>  
        </div>
            {/* Search Bar  */}

        {/* Angon atau farmer section */}
        <div className="s d-flex justify-center ">
            <div className="card w-[650px] p-2">
                <div className="card-body d-flex justify-start">
                    <div id="profile-picture">
                        <img src={userData.avatar || "https://i.pinimg.com/564x/df/e2/9f/dfe29f50ec425d8b4bd1eafb86f3ff2a.jpg"} alt="Descriptive Alt Text" width={250} height={250} />
                        <p className="text-sm text-center mt-3 text-black font-thin">Upah : Rp 100.000.0000 / Tahun</p>
                        <div className="d-flex mt-[-0.5rem] justify-center">
                            <ReactStars count={5} size={24} color2={'#ffd700'} />
                        </div>
                    </div>
                    <div id="data pelanggan">
                        <h5 className="text-black font-bold text-center">Riwayat Pelaggan</h5>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableCell><p className="text-md text-black">Data Pelanggan</p></TableCell>
                                    <TableCell><p className="text-md text-black">Sapi</p></TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>

           
    </>
  )
}




