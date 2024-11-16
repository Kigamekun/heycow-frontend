'use client';

// import from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Link from "next/link";
import { T } from "@/public/assets/extensions/chart.js/chunks/helpers.segment";
import { useEffect } from "react";

export default function Requests() {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [collapsedIndex, setCollapsedIndex] = useState(null);
    const [approved, setApproved] = useState({
        status: 'approved'
    });
    const [isBouncing, setIsBouncing] = useState(false);
    const [requests, setRequests] = useState([]);
    const [cattleData, setCattleData] = useState(null);
    const toggleCollapse = (index) => {
        setIsCollapsed(!isCollapsed);
        // setIsBouncing(true);
        // setTimeout(() => setIsBouncing(false), 500);
        setCollapsedIndex(collapsedIndex === index ? null : index);
    };

    const getRequests = async () => {
        console.log('mengambil data requests....');
        try {
          var response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/request-angon`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          console.log('Response request saya:', response.data);
          if (response.data.data) {
            setRequests(response.data.data);
          } else {
            console.error('Data yang diterima bukan array:', response.data);
          }
        } catch (error) {
          console.error('Error:', error);
        }
    };
   
    const approveRequest = async (requestId) => {
      console.log(`Mengapprove request ${requestId}....`);
      try {
        const bodyFormData = new FormData();
        bodyFormData.append('status', 'approved');
        const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/request-angon/${requestId}/approve`, bodyFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log(`Response for request ${requestId}:`, response.data);
        Swal.fire({
          icon: 'success',
          title: 'Request approved',
          showConfirmButton: false,
          timer: 1500
        });
        getRequests();
      } catch (error) {
        console.error('Error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error occurred',
          text: error.response.data.message,
          showConfirmButton: false,
          timer: 1500
        });
      }
    };

    const declineRequest = async (requestId) => {
      console.log(`Mengapprove request ${requestId}....`);
      try {
        const bodyFormData = new FormData();
        bodyFormData.append('status', 'declined');
        const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/request-angon/${requestId}/reject`, bodyFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log(`Response for request ${requestId}:`, response.data);
        Swal.fire({
          icon: 'success',
          title: 'Request Declined',
          showConfirmButton: false,
          timer: 1500
        });
        getRequests();
      } catch (error) {
        console.error('Error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error occurred',
          text: error.response.data.message,
          showConfirmButton: false,
          timer: 1500
        });
      }
    };


    const getCattleData = async (cattleId) => {
        console.log('mengambil data cattle....');
        try {
          var response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/cattle/${cattleId}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          console.log('Response cattle:', response.data.data);
          setCattleData(response.data);
        } catch (error) {
          console.error('Error:', error);
        }
      };
      
      const getStatusClass = (status) => { 
        if (status === 'pending') {
          return 'bg-yellow-400';
        } else if (status === 'approved') {
          return 'bg-green-400';
        } else if (status === 'declined') {
          return 'bg-red-400';
        }
      }
      useEffect(() => {
        if (requests.length > 0) {
          getCattleData(requests[0].cattle_id);
        }
      }, [requests]);
      const filteredRequests = requests.filter(request => request.status === 'approved' || request.status === 'pending');
    useEffect(() => {
        getRequests();

    }, []);

    console.log('data',requests[0] && requests[0].title)
    return (
      <>
        <h3 className="mb-4 ml-2 text-emerald-600">Request</h3>
        <div className="grid grid-cols-1 gap-3">
        {filteredRequests && filteredRequests.map((request, index) => (
        <div key={index} className="d-flex justify-center">
          <div className="w-[60rem] p-4 bg-white border border-gray-300 rounded-lg shadow-sm">
          <div
            className="grid grid-cols-[1fr_auto] items-center cursor-pointer border-black pb-2"
            onClick={() => toggleCollapse(index)}
          >
            <h3 className="text-lg font-semibold float-start">{request.title}</h3>
            <h3 className={`text-sm text-black p-2 rounded-xl font-semibold float-end ${getStatusClass(request.status)}`}>{request.status}</h3>
            <span
            className={`text-gray-500 transition-transform duration-200 ${collapsedIndex === index ? 'transform scale-125' : ''}`}
            >
            {collapsedIndex === index ? '-' : '+'}
            </span>
          </div>
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${collapsedIndex === index ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
          >
            <div className="grid justify-items-center">
            <div className="card w-[50rem]">
              <div className="card-body p-[3rem]">
              <div className="grid w-full grid-cols-1 gap-3">
                <div className="justify-center">
                <div className="d-flex justify-center">
                  <h5 className="font-bold text-black">Data Sapi</h5>
                </div>
                </div>
                <div className="d-flex justify-center">
                {/* First Table */}
                <div className="border border-black rounded-lg w-[40rem] ">
                  <Table>
                  <TableHeader>
                    <TableRow className="text-lg border-b border-black">
                    <TableCell>Data</TableCell>
                    <TableCell>Sapi</TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="text-black border-b border-black">
                    <TableCell className="text-lg font-bold">Breed</TableCell>
                    <TableCell className="text-sm font-thin">{request.cattle && request.cattle.breed && request.cattle.breed.name}</TableCell>
                    </TableRow>
                    <TableRow className="text-black border-b border-black">
                    <TableCell className="text-lg font-bold">Gender</TableCell>
                    <TableCell className="text-sm font-thin">{request.cattle && request.cattle.gender}</TableCell>
                    </TableRow>
                    <TableRow className="text-black border-b border-black">
                    <TableCell className="text-lg font-bold">Date of Birth</TableCell>
                    <TableCell className="text-sm font-thin">{request.cattle && request.cattle.birth_date}</TableCell>
                    </TableRow>
                    <TableRow className="text-black border-b border-black">
                    <TableCell className="text-lg font-bold">Weight</TableCell>
                    <TableCell className="text-sm font-thin">{request.cattle && request.cattle.birth_weight}</TableCell>
                    </TableRow>
                    <TableRow className="text-black border-b border-black">
                    <TableCell className="text-lg font-bold">Height</TableCell>
                    <TableCell className="text-sm font-thin">{request.cattle && request.cattle.birth_height}</TableCell>
                    </TableRow>
                    <TableRow className="text-black">
                    <TableCell className="text-lg font-bold">IoT Devices</TableCell>
                    <TableCell className="text-sm font-thin">{request.cattle && request.cattle.iot_device && request.cattle.iot_device.serial_number}</TableCell>
                    </TableRow>
                  </TableBody>
                  </Table>
                </div>
                </div>
              </div>
              {request.is_pengangon === true && request.status === 'pending' && (
                <div className="px-16 py-3 float-end">
                <Link href='/peternak/contract'>
                  <Button onClick={() => approveRequest(request.id)} className="mr-3 text-white rounded-md bg-emerald-600">Terima</Button>
                </Link>
                <Button onClick={() => declineRequest(request.id)} className="text-white ml-6 bg-red-500 rounded-md ">Tolak</Button>
                </div>
              )}
              </div>
            </div>
            </div>
          </div>
          </div>
        </div>
        ))}
        </div>
      </>
    );
}
