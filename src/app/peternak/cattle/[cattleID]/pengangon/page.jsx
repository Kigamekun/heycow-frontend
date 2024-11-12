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
import { ArrowUpDown } from "lucide-react"
import { useAuth } from "@/lib/hooks/auth"; // Hook untuk autentikasi
import { useRouter } from "next/navigation"

import axios from "axios"
import Swal from "sweetalert2"
import Cattle from "@/app/admin/cattle/page"

import Link from "next/link"
export default function Pengangon( {params} ) {
  const { user, logout } = useAuth({ middleware: 'cattleman' || 'admin' })
  const router = useRouter();
  const [userData, setUserData] = React.useState(
    []
  )
  const [cattleData, setCattleData] = React.useState([])
  const [searchQuery, setSearchQuery] = React.useState('');
  const [updateData, setUpdateData] = React.useState({
    cattle_id: params.cattleID,
    name: "",
    farm: "",
    breed_id: "" ,
    type : "",
    status : "",
    birth_date : "",
    birth_weight : "",
    birth_height : "",
    iot_device_id : "",
    last_vaccination : ""
  });

  const filteredUserData = userData.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  
  const getUserData = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/users/pengangon`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (res.data.data) {
          console.log('User data:', res.data.data);
          setUserData(res.data.data);
      //   const filteredUsers = res.data.data.filter(user => user.is_pengangon === 1);
      //   setUserData(filteredUsers);
      //   console.log('Filtered user data:', filteredUsers);
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
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error occurred',
          text: 'Please try again later.',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  const getCattleData = async () => {
    console.log('Getting cattle data...');
    try{
      var res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/cattle/${params.cattleID}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }})
    }catch(error){
      Swal.fire({
        icon: 'error',
        title: 'Error occurred',
        text: ['Please try again later.', error],
        showConfirmButton: false,
        timer: 150
      })
    }
  }

  const updateCattleData = async() => {
    console.log('Updating cattle data...');
    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/cattle/${params.cattleID}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      console.log('Cattle data:', res.data.data);
      
    }catch (error) {
      
    }
  }
const handleSearchChange = (event) => {
  setSearchQuery(event.target.value);
};
  React.useEffect(() => {
    getUserData();
  }, [])
  return (
    <>
      <h3 className="ml-2 text-emerald-600">Pengangon</h3>
    
        {/* Search Bar  */}
        <div>
          <div className="card-body float-start rounded">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>

      {/* Angon atau farmer section */}
      {filteredUserData.length > 0 ? (
        <div className="container grid grid-cols-2 gap-3 mt-4">
          {filteredUserData.map((user, index) => (
            <div key={index} className="card">
              <div className="card-body image dan profile d-flex gap-4">
                <img src={user.full_avatar_url || "https://via.placeholder.com/130"} alt="user" className="w-[130px]" />
                <div className="d-flex flex-col grid ">
                  <h4 className="text-black font-bold">{user.name}</h4>
                  <p className="text-md text-black font-bold">{user.farm}</p>
                  <p className="text-">{user.upah}</p>
                  <p className="font-bold">{user.address}</p>
                </div>
              </div>
              <div className="rating card-body mt-[-20px] d-flex justify-between">
                {/* rating */}
                <ReactStars count={5} value={user.rate} size={24} color2={'#ffd700'} />
                
                {/* button */}
                <Link href={`/peternak/cattle/${params.cattleID}/pengangon/${user.id}`}><button className="btn btn-success">Pilih</button></Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-4 text-center text-gray-500">No results found</div>
      )}
    </>
  )
}




