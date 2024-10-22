'use client'


import ReactStars from "react-stars"
import { Button } from "@/components/ui/button"
import * as React from "react"
import { hoshino } from "@/images/hoshino.jpg"
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table"
import { ArrowUpDown, Link } from "lucide-react"
import { useAuth } from "@/lib/hooks/auth"; // Hook untuk autentikasi


import axios from "axios"
import Swal from "sweetalert2"


export default function Home() {
  const { user, logout } = useAuth({ middleware: 'admin' })


  return (
    <>
        <h3 className="ml-2 text-emerald-600">Pengangon</h3>
        
            {/* Search Bar  */}

        {/* Angon atau farmer section */}
        <div className="container d-flex justify-center ">
            <div className="card w-[500px]">
            <div className="card-body image dan profile d-flex gap-4">
                <img src="https://i.pinimg.com/control/564x/01/19/1f/01191fd3ece2dcd44122ff6d88149abc.jpg" alt="cow" />
                <div className="d-flex flex-col grid grid-rows-3 gap-3">
                    <h4 className="text-black font-bold">Mulyono</h4>
                    <p className="text-r">Ciomas, Bogor Regency, Jawa Barat</p>
                    <p className="text-sm font-bold">Kazama Farm</p>
                </div>
            </div>
            <div className="rating card-body mt-[-20px] d-flex justify-between">
                {/* rating */}
                <ReactStars count={5} size={24} color2={'#ffd700'} />
                
                {/* button */}
                <button className="btn btn-success" onClick={() => window.location.href = '/peternak/angon/pengangon'}>Pilih</button>

            </div>
            </div>
        </div>
        <div className="card p-5">
            <div className="card-boy">
                Hello
            </div>
        </div>        
    </>
  )
}




