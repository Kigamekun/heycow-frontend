'use client'

import { useAuth } from "@/lib/hooks/auth"; // Hook for authentication
import { useState, useEffect } from 'react';
import axios from "axios";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Swal from "sweetalert2"
export default function Health({params}){
    const { user, logout } = useAuth({ middleware: 'cattleman' });
    const [healthData, setHealthData] = useState([]);
    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };
    const getHealthCattle = async() => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/cattle/${params.cattleID}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log('Health data:', res.data.data);
            setHealthData(res.data.data);
        } catch (error) {
            console.error('Error fetching health data:', error);
        }
    }

    const getQrImages = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/getFile/storage`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log('QR Images data:', res.data.data);
            // Assuming you want to set the QR images data to state
            setHealthData(prevData => ({
                ...prevData,
                qrImages: res.data.data
            }));
        } catch (error) {
            console.error('Error fetching QR images data:', error);
        }
    };

    useEffect(() => {
        getHealthCattle();
        getQrImages();
    }, []);
    useEffect(() => {
        getHealthCattle();
    }, [])
    return (
        <>
            <div className="card w-[55rem] mx-auto">
                <div className="card-body d-flex justify-around">
                    <div className="img">
                        {/* Image or other content can go here */}
                        <img 
                            src={healthData && healthData.image ? healthData.image : 'https://www.shutterstock.com/search/cute-cow'} 
                            alt="cow" 
                            width={250} 
                        />
                    </div>
                    <div className="content">
                        <Table>
                            <TableHeader>
                                <TableRow className="text-lg">
                                    <TableCell>Data</TableCell>
                                    <TableCell>Sapi</TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow className="text-black">
                                    <TableCell className="font-bold text-lg">Nama Sapi</TableCell>
                                    <TableCell className="font-thin text-sm">{healthData && healthData.name}</TableCell>
                                </TableRow>
                                <TableRow className="text-black">
                                    <TableCell className="font-bold text-lg">Check Up Time</TableCell>
                                    <TableCell className="font-thin text-sm">{healthData.healthRecords && healthData.healthRecords.checkup_time ? formatDate(healthData.healthRecords.checkup_time) : 'N/A'}</TableCell>
                                </TableRow>
                                <TableRow className="text-black">
                                    <TableCell className="font-bold text-lg">Temperature</TableCell>
                                    <TableCell className="font-thin text-sm">{healthData.healthRecords && healthData.healthRecords.temperature ? healthData.healthRecords.temperature : 'N/A'}</TableCell>
                                </TableRow>
                                <TableRow className="text-black">
                                    <TableCell className="font-bold text-lg">Status</TableCell>
                                    <TableCell className="font-thin text-sm">{healthData.healthRecords && healthData.healthRecords.status ? healthData.healthRecords.status : 'N/A'}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </>
    )
}