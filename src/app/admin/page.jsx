'use client'

import { Button } from "@/components/ui/button"
import * as React from "react"

import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { useAuth } from "@/lib/hooks/auth"; // Hook untuk autentikasi


import axios from "axios"
import Swal from "sweetalert2"

import AlertPenyusup from "./alertPenyusup";
import { useRouter } from 'next/router';
export default function Home() {
  const { user, logout } = useAuth({ middleware: 'admin' })

  const alert = () => {
    Swal.fire({
      title: "Anda bukan admin!",
      text: "Anda tidak memiliki akses ke halaman ini!",
      icon: "error",
      showCancelButton: false,
      confirmButtonColor: "#6A9944",
      confirmButtonText: "OK"
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = '/peternak'; // Redirect to /peternak
      }
    });
  }
  if (user !== 'admin') {
    alert()
  }
  // if (useAuth!== 'admin') {
  //   return <AlertPenyusup />
  // }
  // const router = useRouter();
  // if (user = useAuth({middleware: !'ad'})) {
  //   return <AlertPenyusup />
  // }
  return (
  <>

  </>
  )
}




