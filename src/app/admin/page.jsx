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


export default function Home() {
  const { user, logout } = useAuth({ middleware: 'admin' })


  return (<></>)
}




