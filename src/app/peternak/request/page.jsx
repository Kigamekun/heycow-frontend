'use client';

import React from "react";
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

export default function History() {
    const [isCollapsed, setIsCollapsed] = React.useState(true);
    const [isBouncing, setIsBouncing] = React.useState(false);
    const [requests, setRequests] = React.useState([]);
    const [cattleData, setCattleData] = React.useState(null);
    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
        setIsBouncing(true);
        setTimeout(() => setIsBouncing(false), 500);
    };

    // const getRequests = async () => {
    //     console.log('mengambil data requests....');
    //     try {
    //       var response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/request-angon`, {
    //         headers: {
    //           'Content-Type': 'application/json',
    //           'Authorization': `Bearer ${localStorage.getItem('token')}`
    //         }
    //       });
    //       console.log('Response request saya:', response.data.data);
    //       if (Array.isArray(response.data.data) && response.data.data.length > 0) {
    //         setRequests(response.data.data[0]);
    //       } else {
    //         console.error('Data yang diterima bukan array atau array kosong:', response.data.data);
    //       }
    //     } catch (error) {
    //       console.error('Error:', error);
    //     }
    //   };
      
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
    console.log('requsest data', requests)
    console.log('Requests title:', requests.length > 0 ? requests.title : 'No data');
    console.log('Requests title :', requests && requests.cattle && requests.cattle.name );
    console.log('Requests title :', requests[0] && requests[0].cattle_id);
    // const getCattleData = async (cattleId) => {
    //     console.log('mengambil data cattle....');
    //     try {
    //       var response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/cattle/${cattleId}`, {
    //         headers: {
    //           'Content-Type': 'application/json',
    //           'Authorization': `Bearer ${localStorage.getItem('token')}`
    //         }
    //       });
    //       console.log('Response cattle:', response.data.data);
    //       setCattleData(response.data.data);
    //     } catch (error) {
    //       console.error('Error:', error);
    //     }
    //   };
      
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
      
      React.useEffect(() => {
        if (requests.length > 0) {
          getCattleData(requests[0].cattle_id);
        }
      }, [requests]);

    React.useEffect(() => {
        getRequests();

    }, []);

    console.log('data',requests[0] && requests[0].title)
    return (
        <>
            <h3 className="mb-4 ml-2 text-emerald-600">Request</h3>
            {requests && requests.map((request, index) => (
      <div key={index} className="d-flex justify-center">
        <div className="w-[60rem] p-4 bg-white border border-gray-300 rounded-lg shadow-sm">
          <div
            className="grid grid-cols-[1fr_auto] items-center cursor-pointer border-black pb-2"
            onClick={toggleCollapse}
          >
            <h3 className="text-lg font-semibold">{request.title}</h3>
            <span
              className={`text-gray-500 transition-transform duration-200 ${isBouncing ? 'transform scale-125' : ''}`}
            >
              {isCollapsed ? '+' : '-'}
            </span>
          </div>
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${isCollapsed ? 'max-h-0 opacity-0' : 'max-h-screen opacity-100'}`}
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
                              <TableCell className="text-sm font-thin">{request.cattle && request.cattle && request.cattle.iot_device_id && request.cattle.iot_device_id}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </div>
                  {request.is_pengangon===true && (<div className="p-3 float-end">
                    <Button className="mr-3 text-white rounded-md bg-emerald-600 ">Terima</Button>
                    <Button className="text-white bg-red-500 rounded-md ">Tolak</Button>
                  </div>) }
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
        </>
    );
}
