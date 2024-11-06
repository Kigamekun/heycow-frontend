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


export default function Home({params}) {
  const { user, logout } = useAuth({ middleware: 'cattleman' || 'admin' })


  return (
    <>
        <h3 className="ml-2 text-emerald-600">Pengangon {params.id}</h3>
        <div className="d-flex justify-center">
            <div className="card p-4 w-[650px] ">
                <div className="card-boy">
                    <h4 className="text-black font-bold">Mulyono</h4>
                </div>
            </div>  
        </div>
            {/* Search Bar  */}

        {/* Angon atau farmer section */}
        <div className="s d-flex justify-center ">
            <div className="card w-[650px] p-2">
                <div className="card-body d-flex justify-around">
                    <div id="profile-picture">
                        <img src="https://i.pinimg.com/564x/df/e2/9f/dfe29f50ec425d8b4bd1eafb86f3ff2a.jpg" alt="Descriptive Alt Text" width={250} height={250} />
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
                                    <TableCell>Reksa's Farm</TableCell>
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




