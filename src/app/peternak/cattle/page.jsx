'use client'

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
import { ArrowUpDown } from "lucide-react"
import { useAuth } from "@/lib/hooks/auth"; // Hook untuk autentikasi


import axios from "axios"
import Swal from "sweetalert2"


export default function Home() {
  const { user, logout } = useAuth({ middleware: 'admin' })


  return (
    <>
      <header className="mb-3">
        <a href="#" className="burger-btn d-block d-xl-none">
          <i className="bi bi-justify fs-3" />
        </a>
      </header>
      <div className="card">
        <div className="card-body">
          <div className="align-items-center">
            <h3 className="ml-2 text-emerald-600">Manage Cattle</h3>

            <div className="mt-2 d-flex grid grid-cols-4 gap-4">
              <div className="card border border-green-500 p-2 m-2">
                <div className="card-body d-flex justify-between gap-2">
                  <img src="https://via.placeholder.com/80" alt="cow" />
                  <div className="d-flex flex-col ">
                    <h6 className="text-emerald-400">Sehat</h6>
                    <p>10</p>
                  </div>

                </div>
              </div>

              <div className="card border p-2 m-2">
                <div className="card-body d-flex justify-between gap-2">
                  <img src="https://via.placeholder.com/80" alt="cow" />
                  <div className="d-flex flex-col ">
                    <h6 className="text-yellow-400">Sold</h6>
                    <p>10</p>
                  </div>
                </div>
              </div>

              <div className="card border border-red-600 p-2 m-2">
                <div className="card-body d-flex justify-between gap-2">
                  <img src="https://via.placeholder.com/80" alt="cow" />

                  <div className="d-flex flex-col ">
                    <h6 className="text-red-600">Dead</h6>
                    <p>10</p>
                  </div>
                </div>
              </div>

              <div className="card  border p-2 m-2">
                <div className="card-body d-flex justify-between gap-2">
                  <img src="https://via.placeholder.com/80" alt="cow" />
                  <div className="d-flex flex-col ">
                    <h6>Pengangon</h6>
                    <p>10</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar  */}
      <div>
        <div className="card-body float-end">
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
        />
        </div>
      </div>

      {/* Cattle section */}
      <div className="container grid grid-cols-3 gap-3 mt-5">
        <div className="card ">
          <div className="card-body d-flex justify-between">
            {/* untuk title */}
            <div className="mt-">
              <h3 className="text-emerald-600">Sapi</h3>
              <p className="text-xs">Iot Device</p>
            </div>
            
            {/* untuk button */}
            <div >
              <div className="bg-emerald-600 rounded-md">
                  <p className="text-white text-sm m-2">Sehat</p>
              </div>
            </div>
          </div>
        </div>
        <div className="card ">
          <div className="card-body d-flex justify-between">
            {/* untuk title */}
            <div className="mt-">
              <h3 className="text-emerald-600">Sapi</h3>
              <p className="text-xs">Iot Device</p>
            </div>
            
            {/* untuk button */}
            <div>
              <div className="bg-emerald-600 rounded-md">
                  <p className="text-white text-sm m-2">Sehat</p>
              </div>
            </div>
          </div>
        </div>
        <div className="card ">
          <div className="card-body d-flex justify-between">
            {/* untuk title */}
            <div className="mt-">
              <h3 className="text-emerald-600">Sapi</h3>
              <p className="text-xs">Iot Device</p>
            </div>
            
            {/* untuk button */}
            <div>
              <div className="bg-emerald-600 rounded-md">
                  <p className="text-white text-sm m-2">Sehat</p>
              </div>
            </div>
          </div>
        </div>
        <div className="card ">
          <div className="card-body d-flex justify-between">
            {/* untuk title */}
            <div className="mt-">
              <h3 className="text-emerald-600">Sapi</h3>
              <p className="text-xs">Iot Device</p>
            </div>
            
            {/* untuk button */}
            <div>
              <div className="bg-emerald-600 rounded-md">
                  <p className="text-white text-sm m-2">Sehat</p>
              </div>
            </div>
          </div>
        </div>
        <div className="card ">
          <div className="card-body d-flex justify-between">
            {/* untuk title */}
            <div className="mt-">
              <h3 className="text-emerald-600">Sapi</h3>
              <p className="text-xs">Iot Device</p>
            </div>
            
            {/* untuk button */}
            <div>
              <div className="bg-emerald-600 rounded-md">
                  <p className="text-white text-sm m-2">Sehat</p>
              </div>
            </div>
          </div>
        </div>
        <div className="card ">
          <div className="card-body d-flex justify-between">
            {/* untuk title */}
            <div className="mt-">
              <h3 className="text-emerald-600">Sapi</h3>
              <p className="text-xs">Iot Device</p>
            </div>
            
            {/* untuk button */}
            <div>
              <div className="bg-emerald-600 rounded-md">
                  <p className="text-white text-sm m-2">Sehat</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}




