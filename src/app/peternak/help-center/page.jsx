'use client'


// Import untuk form 
import { useRef } from "react";
import { Editor } from '@tinymce/tinymce-react';

// import Uppy from "@uppy/core";
// import Dashboard from "@uppy/dashboard";
import { useEffect } from "react";

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import { Input } from "@/components/ui/input";

import ReactStars from "react-stars"
import { Button } from "@/components/ui/button"
import * as React from "react"
import { hoshino } from "@/images/hoshino.jpg"

import { ArrowUpDown, Link } from "lucide-react"
import { useAuth } from "@/lib/hooks/auth"; // Hook untuk autentikasi


import axios from "axios"
import Swal from "sweetalert2"


export default function Home() {
  const { user, logout } = useAuth({ middleware: 'cattleman' })
//   new Uppy().use(Dashboard, { inline: true, target: '#uppy-dashboard' });
    const editorRef = useRef();
  return (
    <>
    
        <h3 className="ml-2 text-emerald-600">Help Center</h3>
        
            {/* Search Bar  */}

        {/* Form section */}
        <div className="d-flex justify-center mt-10">
            <div className="card p-5 w-[50rem] ">
                <div className="card-boy " >
                    <form>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <Input type="text" className="form-control" id="name" placeholder="Name" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <Input type="email" className="form-control" id="email" placeholder="Email" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="subject" className="form-label">Jenis Masalah</label>
                            <select className="form-select" id="subject">
                                <option value="">Pilih Keluhan mu</option>
                                <option value="2">Kerusakan Aplikasi</option>
                                <option value="2">Pengiriman</option>
                                <option value="3">Lainnya</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">Lampirkan Bukti</label>
                            {/* <Dashboard id="uppy-dashboard" /> */}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="message" className="form-label">Message</label>
                            <Editor  
                                onInit={ (evt, editor ) => editorRef.current = editor}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>   
        </div>
             
    </>
  )
}
