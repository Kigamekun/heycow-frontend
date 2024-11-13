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
import { useRouter } from "next/router"

import axios from "axios"
import Swal from "sweetalert2"


export default function Angon() {
  const { user, logout } = useAuth({ middleware: 'cattleman' || 'admin' })
// const router = useRouter();
  const [userData, setUserData] = React.useState(
    []
)

 
const getUserData = async () => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/users/pengangon`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (res.data.data) {
      setUserData(res.data.data);
      console.log('Filtered user data:', filteredUsers);
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      Swal.fire({
        icon: 'error',
        title: error.response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      logout();
    } 
    
  }
}

  React.useEffect(() => {
    getUserData();
  }, [])
  return (
    <>
      <h3 className="ml-2 text-emerald-600">Pengangon</h3>
    
        {/* Search Bar  */}
      <div className="mt-3">
        <div className="card-body float-start rounded">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
          />
        </div>
      </div>
      {/* Angon atau farmer section */}
      {/* Angon atau farmer section */}
      <div className="container grid grid-cols-2 gap-3 mt-4">
        {userData.map((user, index) => (
          <div key={index} className="card">
            <div className="card-body image dan profile d-flex gap-4">
              <img src={user && user.avatar|| "https://via.placeholder.com/130"} alt="user" className="w-[130px]" />
              <div className="d-flex flex-col grid grid-rows-3 gap-3">
                <h4 className="text-black font-bold">{user.name}</h4>
                <p className="text-r">{user.address}</p>
                <p className="text-sm font-bold">{user.farm_name ? user.farm_name : 'No Farm'}</p>
                <p className="text-sm font-bold">Rp {user.upah}</p>
              </div>
            </div>
            <div className="rating card-body mt-[-20px] d-flex justify-between">
              {/* rating */}
              <ReactStars count={5} size={24} value={user.rate} color2={'#ffd700'} />
              
              {/* button */}
              <button className="btn btn-success" onClick={() => window.location.href = `/peternak/angon/${user.id}`}>Pilih</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}




