'use client'

import ReactStars from "react-stars";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { Image } from "@nextui-org/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/lib/hooks/auth"; // Hook for authentication
import axios from "axios";
import Swal from "sweetalert2";
import Link from 'next/link'; 
import { useRouter } from 'next/navigation';
import { Select, SelectItem } from "@nextui-org/react";

export default function PengangonDetail({ params }) {
  // const { cattleID, pengangonID } = params; // Accessing route params directly
  const router = useRouter();
  const { cattleID, pengangonID } = router.query;
  const { user, logout } = useAuth({ middleware: 'cattleman' || 'admin' });

  const [userData, setUserData] = React.useState(null);
  const [cattleData, setCattleData] = React.useState([]);
  const [cattle, setCattle] = React.useState(null);
  const getUserData = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/users/pengangon/${user.id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (res.data.data) {
        setUserData('user data pengangon' ,res.data.data);
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
  }

  const getCattleData = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/cattle/${cattle.id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('Cattle data:', res.data.data);
      if (res.data.data) {
        setCattleData(res.data.data);
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
  }
  useEffect(() => {
    console.log('Cattle ID:', cattleID);
    console.log('Pengangon ID:', pengangonID);
  }, [cattleID, pengangonID]);

  React.useEffect(() => {
    if (cattleID && pengangonID) {
      getUserData();
      getCattleData();
    }
  }, [cattleID, pengangonID]);

  if (!userData || !cattleData) {
    return <div>Loading...</div>;
  }

  const handleSelectChange = (value) => {
    console.log('Selected category:', value);
    // Handle category selection logic
  };

  return (
    <>
     <div>
      <h1>Cattle ID: {cattleID}</h1>
      <h2>Pengangon ID: {pengangonID}</h2>
      {/* Your other component logic here */}
    </div>
      <h3 className="ml-2 text-emerald-600">{userData.name}</h3>
      <div className="d-flex justify-center">
        <div className="card p-4 w-[650px] ">
          <div className="card-body">
            <h4 className="text-black font-bold">{userData.name}</h4>
          </div>
        </div>  
      </div>
      {/* Angon or Farmer section */}
      <div className="s d-flex justify-center ">
        <div className="card w-[650px] p-2">
          <div className="card-body d-flex justify-around">
            <div id="profile-picture">
              <img src={userData.full_avatar_url || "https://via.placeholder.com/250"} alt="Descriptive Alt Text" width={250} height={250} />
              <p className="text-sm text-center mt-3 text-black font-thin">Upah : Rp {userData.upah} / Tahun</p>
              <div className="d-flex mt-[-0.5rem] justify-center">
                <ReactStars count={5} size={24} color2={'#ffd700'} />
              </div>
            </div>
            <div id="data pelanggan">
              <h5 className="text-black font-bold text-center">Riwayat Pelanggan</h5>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCell><p className="text-md text-black">Data Pelanggan</p></TableCell>
                    <TableCell><p className="text-md text-black">Sapi</p></TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userData.customers.map((customer, index) => (
                    <TableRow key={index}>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.cattle}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-center">
        <div className="card w-[650px] p-2">
          <div className="card-body">
            <label htmlFor="category" className="text-black font-bold">
              <h6>Category<span className="text-red-600">*</span></h6>
            </label>
            <Select
              id="category"
              name="category"
              variant="bordered"
              placeholder="Select a category"
              className="w-full h-[2.8rem]"
              onChange={handleSelectChange}
            >
              {cattleData.map((cattle) => (
                <SelectItem key={cattle.id} value={cattle.farm && cattle.farm.name}>
                  {cattle.farm && cattle.farm.name}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
      </div>
      <div className="title-iot d-flex justify-center">
        <img src={cattleData.imageUrl} alt="cattle" width={250} height={250} />
      </div>
      <p className="text-lg text-black text-center">From : <span className="font-bold">{cattleData.farm && cattleData.farm.name}</span></p>
      <div className="d-flex justify-around">
        <Link href="#">
          <Button className="bg-yellow-300" onClick={() => alert('Kamu yakin ingin diangonkan?')}>Angonkan</Button>
        </Link>
        <Button className="bg-emerald-600">Jual</Button>
      </div>
      <div className="grid grid-cols-1 gap-3 w-full">
        <div>
          <div className="title-iot d-flex justify-between">
            <div className="d-flex gap-3">
              <i className="bi bi-trash-fill text-2xl cursor-pointer text-red-700"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
